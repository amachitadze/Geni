import React from 'react';
import { CloseIcon, DocumentTextIcon, JsonImportIcon, DocumentPlusIcon, CloudDownloadIcon } from './Icons';

interface ImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImportFromFile: () => void;
  onMergeFromFile: () => void;
}

const ImportModal: React.FC<ImportModalProps> = ({ isOpen, onClose, onImportFromFile, onMergeFromFile }) => {
    const handleImportClick = () => {
        onImportFromFile();
        onClose();
    };

    const handleMergeClick = () => {
        onMergeFromFile();
        onClose();
    };

    if (!isOpen) return null;

    const buttonBaseClasses = "w-full p-4 rounded-lg border flex items-center gap-4 text-left transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800";
    const buttonHoverClasses = "hover:bg-gray-100 dark:hover:bg-gray-700";

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 transition-opacity p-4" onClick={onClose}>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-lg border border-gray-300 dark:border-gray-700 max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
                <header className="flex items-start justify-between mb-4">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">მონაცემების იმპორტი</h2>
                    <button onClick={onClose} className="p-2 -mt-2 -mr-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors" aria-label="დახურვა">
                        <CloseIcon className="w-6 h-6" />
                    </button>
                </header>
                <p className="text-gray-600 dark:text-gray-400 mb-6">აირჩიეთ, როგორ გსურთ მონაცემების იმპორტირება. ფაილიდან იმპორტი მოგთხოვთ დადასტურებას.</p>

                <div className="space-y-4">
                     <a
                        href="https://forms.gle/FEpBTcWyN8t7V9iC8"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${buttonBaseClasses} bg-gray-50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600 ${buttonHoverClasses}`}
                    >
                        <DocumentTextIcon className="w-8 h-8 text-purple-500 flex-shrink-0" />
                        <div className="flex-grow">
                            <span className="font-semibold text-gray-800 dark:text-gray-200">მონაცემების დამატება ფორმით</span>
                            <p className="text-xs text-gray-500 dark:text-gray-400">ხსნის Google Forms-ს, სადაც შეგიძლიათ შეავსოთ და გამოაგზავნოთ მონაცემები.</p>
                        </div>
                    </a>

                    <a
                        href="https://forms.gle/XpF826bYbhnySdTy7"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${buttonBaseClasses} bg-gray-50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600 ${buttonHoverClasses}`}
                    >
                        <CloudDownloadIcon className="w-8 h-8 text-purple-500 flex-shrink-0" />
                        <div className="flex-grow">
                            <span className="font-semibold text-gray-800 dark:text-gray-200">მონაცემების გადმოწერა დრაივიდან</span>
                            <p className="text-xs text-gray-500 dark:text-gray-400">მოითხოვეთ თქვენი მონაცემების ასლი .json ფორმატში.</p>
                        </div>
                    </a>

                    <button
                        onClick={handleImportClick}
                        className={`${buttonBaseClasses} bg-gray-50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600 ${buttonHoverClasses}`}
                    >
                        <JsonImportIcon className="w-8 h-8 text-purple-500 flex-shrink-0" />
                        <div className="flex-grow">
                            <span className="font-semibold text-gray-800 dark:text-gray-200">იმპორტი ფაილიდან (ჩანაცვლება)</span>
                            <p className="text-xs text-gray-500 dark:text-gray-400">წაშლის მიმდინარე ხეს და ჩაანაცვლებს ფაილის მონაცემებით.</p>
                        </div>
                    </button>

                    <button
                        onClick={handleMergeClick}
                        className={`${buttonBaseClasses} bg-gray-50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600 ${buttonHoverClasses}`}
                    >
                        <DocumentPlusIcon className="w-8 h-8 text-purple-500 flex-shrink-0" />
                        <div className="flex-grow">
                            <span className="font-semibold text-gray-800 dark:text-gray-200">მონაცემების შერწყმა ფაილიდან</span>
                            <p className="text-xs text-gray-500 dark:text-gray-400">შეურწყამს ფაილის მონაცემებს მიმდინარე ხესთან.</p>
                        </div>
                    </button>
                </div>
                <footer className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700 text-center">
                    <a href="https://youtu.be/3NZ8Ln_S1-E" target="_blank" rel="noopener noreferrer" className="text-sm text-purple-600 dark:text-purple-400 hover:underline">
                        იმპორტის დეტალური ინსტრუქცია (ვიდეო)
                    </a>
                </footer>
            </div>
        </div>
    );
};

export default ImportModal;