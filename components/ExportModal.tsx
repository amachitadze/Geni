import React from 'react';
import { CloseIcon, JsonExportIcon, MailIcon } from './Icons';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onExportJson: () => void;
}

const ExportModal: React.FC<ExportModalProps> = ({ isOpen, onClose, onExportJson }) => {
    
    const handleExportClick = () => {
        onExportJson();
        onClose();
    };

    if (!isOpen) return null;

    const buttonBaseClasses = "w-full p-4 rounded-lg border flex items-center gap-4 text-left transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800";
    const buttonHoverClasses = "hover:bg-gray-100 dark:hover:bg-gray-700";

    const mailtoLink = "mailto:avtandili.ma@gmail.com?subject=" + encodeURIComponent("გენეალოგიის მონაცემების განახლება") + "&body=" + encodeURIComponent("გამარჯობა,\n\nგთხოვთ, იხილოთ მიმაგრებული განახლებული .json ფაილი.\n\nმადლობა.");

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 transition-opacity p-4" onClick={onClose}>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-lg border border-gray-300 dark:border-gray-700 max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
                <header className="flex items-start justify-between mb-4">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">მონაცემების ექსპორტი</h2>
                    <button onClick={onClose} className="p-2 -mt-2 -mr-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors" aria-label="დახურვა">
                        <CloseIcon className="w-6 h-6" />
                    </button>
                </header>
                <p className="text-gray-600 dark:text-gray-400 mb-6">აირჩიეთ, როგორ გსურთ მონაცემების შენახვა ან გაგზავნა.</p>

                <div className="space-y-4">
                    <button
                        onClick={handleExportClick}
                        className={`${buttonBaseClasses} bg-gray-50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600 ${buttonHoverClasses}`}
                    >
                        <JsonExportIcon className="w-8 h-8 text-purple-500 flex-shrink-0" />
                        <div className="flex-grow">
                            <span className="font-semibold text-gray-800 dark:text-gray-200">ექსპორტი ფაილში (.json)</span>
                            <p className="text-xs text-gray-500 dark:text-gray-400">ინახავს თქვენს გენეალოგიურ ხეს .json ფაილად თქვენს მოწყობილობაში.</p>
                        </div>
                    </button>

                    <a
                        href={mailtoLink}
                        className={`${buttonBaseClasses} bg-gray-50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600 ${buttonHoverClasses}`}
                    >
                        <MailIcon className="w-8 h-8 text-purple-500 flex-shrink-0" />
                        <div className="flex-grow">
                            <span className="font-semibold text-gray-800 dark:text-gray-200">განახლების გაგზავნა ადმინთან</span>
                            <p className="text-xs text-gray-500 dark:text-gray-400">ხსნის თქვენს იმეილის პროგრამას, რათა გაუგზავნოთ განახლებული ფაილი.</p>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default ExportModal;