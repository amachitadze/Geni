import React, { useState } from 'react';
import { encryptData, bufferToBase64 } from '../utils/crypto';
import { People } from '../types';
import { ShareIcon, CopyIcon, CloseIcon } from './Icons';

declare const pako: any;

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: {
    people: People;
    rootIdStack: string[];
  };
}

const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose, data }) => {
  const [password, setPassword] = useState('');
  const [shareUrl, setShareUrl] = useState('');
  const [serviceUsed, setServiceUsed] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [includeImages, setIncludeImages] = useState(true);

  const generatePassword = () => {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let pass = '';
    for (let i = 0; i < 12; i++) {
      pass += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setPassword(pass);
  };

  const removeImages = (originalData: any) => {
      const newData = JSON.parse(JSON.stringify(originalData));
      if (newData.people) {
          Object.keys(newData.people).forEach(key => {
              if (newData.people[key].imageUrl) {
                  delete newData.people[key].imageUrl;
              }
          });
      }
      return newData;
  };

  const uploadToJsonBlob = async (encryptedData: string) => {
      // Fallback logic for localhost vs production
      const jsonBlobEndpoint = window.location.hostname === 'localhost'
        ? 'https://corsproxy.io/?https://jsonblob.com/api/jsonBlob'
        : '/api/jsonblob';

      const response = await fetch(jsonBlobEndpoint, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
          },
          body: JSON.stringify({ data: encryptedData }), // Wrap in object
      });

      if (!response.ok) {
          throw new Error(`JsonBlob Error: ${response.status}`);
      }

      // JsonBlob usually returns location in header
      const locationHeader = response.headers.get('Location');
      let blobId = '';
      
      if (locationHeader) {
          blobId = locationHeader.split('/').pop() || '';
      }
      
      return blobId;
  };

  const handleGenerateLink = async () => {
    if (!password) {
      setError('გთხოვთ, ჯერ შექმენით პაროლი.');
      return;
    }
    setIsLoading(true);
    setError('');
    setShareUrl('');
    setServiceUsed('');

    try {
      // 0. Manual Check: If user explicitly disabled images
      if (!includeImages) {
          console.log("User disabled images. Stripping and uploading to JsonBlob...");
          const liteData = removeImages(data);
          const liteJsonString = JSON.stringify(liteData);
          const liteCompressed = pako.deflate(liteJsonString);
          const liteCompressedBase64 = bufferToBase64(liteCompressed.buffer);
          const liteEncryptedData = await encryptData(liteCompressedBase64, password);

          const blobId = await uploadToJsonBlob(liteEncryptedData);
          if (blobId) {
              const url = `${window.location.origin}${window.location.pathname}?blobId=${blobId}`;
              setShareUrl(url);
              setServiceUsed('JsonBlob (სურათების გარეშე)');
              setIsLoading(false);
              return;
          }
      }

      // 1. Prepare Full Data (with images)
      const fullJsonString = JSON.stringify(data);
      const fullCompressed = pako.deflate(fullJsonString);
      const fullCompressedBase64 = bufferToBase64(fullCompressed.buffer);
      const fullEncryptedData = await encryptData(fullCompressedBase64, password);
      
      const fullDataSize = new Blob([fullEncryptedData]).size;
      console.log(`Full Data Size: ${(fullDataSize / 1024).toFixed(2)} KB`);

      // --- STRATEGY: Prioritize JsonBlob if size < 1MB (Fastest & Most Reliable) ---
      if (fullDataSize < 1000000) { // < 1MB
          console.log("File is small (<1MB), uploading FULL data to JsonBlob...");
          try {
              const blobId = await uploadToJsonBlob(fullEncryptedData);
              if (blobId) {
                  const url = `${window.location.origin}${window.location.pathname}?blobId=${blobId}`;
                  setShareUrl(url);
                  setServiceUsed('JsonBlob (სრული - სურათებით)');
                  setIsLoading(false);
                  return;
              }
          } catch (e) {
              console.warn("JsonBlob full upload failed, trying alternatives...", e);
          }
      }

      // --- ATTEMPT 2: File.io (For large files or if JsonBlob failed) ---
      try {
          console.log("Attempting File.io...");
          const formData = new FormData();
          const blob = new Blob([fullEncryptedData], { type: 'text/plain' });
          formData.append('file', blob, 'tree.data');
          formData.append('expires', '2w');
          formData.append('maxDownloads', '1');

          // Fallback logic for localhost vs production
          const fileIoEndpoint = window.location.hostname === 'localhost' 
            ? 'https://corsproxy.io/?https://file.io' 
            : '/api/share';

          const response = await fetch(fileIoEndpoint, {
              method: 'POST',
              body: formData,
          });

          if (response.ok) {
              const result = await response.json();
              if (result.success && result.key) {
                  const url = `${window.location.origin}${window.location.pathname}?fileKey=${result.key}`;
                  setShareUrl(url);
                  setServiceUsed('File.io (სრული - სურათებით)');
                  setIsLoading(false);
                  return; // Success! Exit function.
              }
          }
          console.warn("File.io response was not successful", response.status);
      } catch (e) {
          console.warn("File.io upload failed, trying fallback...", e);
      }

      // --- ATTEMPT 3: JsonBlob (Fallback - No Images) ---
      // We only reach here if file > 1MB AND File.io failed, OR if file < 1MB and JsonBlob failed initially.
      console.log("Attempting JsonBlob LITE fallback...");
      const liteData = removeImages(data);
      const liteJsonString = JSON.stringify(liteData);
      const liteCompressed = pako.deflate(liteJsonString);
      const liteCompressedBase64 = bufferToBase64(liteCompressed.buffer);
      const liteEncryptedData = await encryptData(liteCompressedBase64, password);

      const blobId = await uploadToJsonBlob(liteEncryptedData);
      if (blobId) {
        const url = `${window.location.origin}${window.location.pathname}?blobId=${blobId}`;
        setShareUrl(url);
        setServiceUsed('JsonBlob (მსუბუქი - სურათების გარეშე)');
        setIsLoading(false);
        return;
      }
      
      throw new Error('ყველა სერვისი მიუწვდომელია.');

    } catch (e: any) {
      console.error("Link generation failed", e);
      setError(`ბმულის გენერაცია ვერ მოხერხდა. შეამოწმეთ ინტერნეტ კავშირი.`);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).catch(err => {
      console.error('Could not copy text: ', err);
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 transition-opacity p-4" onClick={onClose}>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-lg border border-gray-300 dark:border-gray-700 max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <header className="flex items-start justify-between mb-4">
          <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-600">ხის გაზიარება</h2>
          <button onClick={onClose} className="p-2 -mt-2 -mr-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors" aria-label="დახურვა">
            <CloseIcon className="h-6 w-6" />
          </button>
        </header>
        <p className="text-gray-600 dark:text-gray-400 mb-4">შექმენით დაშიფრული ბმული და პაროლი, რომ გაუზიაროთ თქვენი გენეალოგიური ხე სხვებს.</p>
        
        <div className="p-3 mb-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-md">
            <p className="text-sm text-yellow-800 dark:text-yellow-200">
                <strong>ყურადღება:</strong> ეს ბმული არის <strong>ერთჯერადი</strong>. მიმღების მიერ გახსნისთანავე ფაილი წაიშლება სერვერიდან (File.io-ს შემთხვევაში).
            </p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">1. პაროლის შექმნა</label>
            <div className="flex gap-2">
              <input type="text" value={password} onChange={e => setPassword(e.target.value)} placeholder="შეიყვანეთ ან შექმენით პაროლი" className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900 dark:text-white" />
              <button onClick={generatePassword} className="px-4 py-2 rounded-md bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 text-gray-800 dark:text-gray-100 transition-colors text-sm">შექმნა</button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">2. კონფიგურაცია</label>
            <div className="flex items-center gap-2 mb-2 p-2 bg-gray-50 dark:bg-gray-700/30 rounded border border-gray-200 dark:border-gray-700">
                <input 
                    type="checkbox" 
                    id="includeImages" 
                    checked={includeImages} 
                    onChange={(e) => setIncludeImages(e.target.checked)}
                    className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500 dark:focus:ring-purple-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label htmlFor="includeImages" className="text-sm font-medium text-gray-700 dark:text-gray-300 select-none cursor-pointer">
                    გავაზიარო სურათებით
                </label>
            </div>
            
            <button onClick={handleGenerateLink} disabled={isLoading || !password} className="w-full px-4 py-2 rounded-md bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 dark:disabled:bg-purple-800 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2 text-white">
                {isLoading ? 'იტვირთება...' : <><ShareIcon className="w-5 h-5"/> ბმულის შექმნა</>}
            </button>
            {error && <p className="text-red-500 dark:text-red-400 text-sm mt-2">{error}</p>}
          </div>

          {shareUrl && (
            <div className="space-y-4 pt-4 border-t border-gray-300 dark:border-gray-700">
                {serviceUsed && (
                    <p className="text-xs text-center text-gray-500 dark:text-gray-400">
                        გამოყენებული სერვისი: <span className="font-semibold text-purple-600 dark:text-purple-400">{serviceUsed}</span>
                    </p>
                )}
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">გასაზიარებელი ბმული</label>
                    <div className="flex gap-2">
                        <input type="text" readOnly value={shareUrl} className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-md text-gray-600 dark:text-gray-300 text-sm" />
                        <button onClick={() => copyToClipboard(shareUrl)} title="ბმულის კოპირება" className="p-2 rounded-md bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 text-gray-800 dark:text-gray-100 transition-colors"><CopyIcon className="w-5 h-5"/></button>
                    </div>
                </div>
                 <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">პაროლი</label>
                    <div className="flex gap-2">
                        <input type="text" readOnly value={password} className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-md text-gray-600 dark:text-gray-300" />
                        <button onClick={() => copyToClipboard(password)} title="პაროლის კოპირება" className="p-2 rounded-md bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 text-gray-800 dark:text-gray-100 transition-colors"><CopyIcon className="w-5 h-5"/></button>
                    </div>
                </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShareModal;