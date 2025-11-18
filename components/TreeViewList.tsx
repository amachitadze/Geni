import React from 'react';
import { Person, People } from '../types';

interface TreeViewListProps {
  rootId: string;
  people: People;
  onNavigate: (personId: string) => void;
  highlightedPersonId: string | null;
}

const ChevronRightIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
    </svg>
);
const DefaultAvatar: React.FC<{ className?: string }> = ({ className }) => (
    <div className={`flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700 ${className}`}>
        <svg xmlns="http://www.w3.org/2000/svg" className="text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{width: '60%', height: '60%'}}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
    </div>
);

const ListItem: React.FC<{ person: Person, onNavigate: (id: string) => void, isHighlighted: boolean, isSpouse?: boolean }> = ({ person, onNavigate, isHighlighted, isSpouse }) => {
    const hasChildren = person.children && person.children.length > 0;
    const highlightClass = isHighlighted ? 'bg-purple-100 dark:bg-purple-900/50' : 'hover:bg-gray-100 dark:hover:bg-gray-700/50';

    const getYear = (dateString?: string) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return dateString; // Return as is if just a year
        return date.getFullYear();
    }
    const birthYear = getYear(person.birthDate);
    const deathYear = getYear(person.deathDate);
    const lifeRange = (birthYear || deathYear) ? `(${birthYear || '?'} - ${deathYear || ''})` : '';

    return (
        <li className="list-none">
            <button
                onClick={() => onNavigate(person.id)}
                className={`w-full flex items-center gap-4 p-3 rounded-lg text-left transition-colors duration-200 ${highlightClass}`}
            >
                {person.imageUrl ? (
                    <img src={person.imageUrl} alt={`${person.firstName} ${person.lastName}`} className="w-12 h-12 object-cover rounded-full flex-shrink-0" />
                ) : (
                    <DefaultAvatar className="w-12 h-12 flex-shrink-0"/>
                )}
                <div className="flex-grow w-0">
                    <p className="font-semibold text-gray-800 dark:text-gray-100 truncate">
                        {person.firstName} {person.lastName}
                        {isSpouse && <span className="ml-2 text-xs font-normal text-gray-500 dark:text-gray-400">(მეუღლე)</span>}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{lifeRange}</p>
                </div>
                {hasChildren && (
                    <ChevronRightIcon className="w-5 h-5 text-gray-400 dark:text-gray-500 flex-shrink-0" />
                )}
            </button>
        </li>
    );
};

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="mb-6">
        <h3 className="px-3 py-1 text-sm font-semibold text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700 mb-2">
            {title}
        </h3>
        <ul className="space-y-1">
            {children}
        </ul>
    </div>
);

const TreeViewList: React.FC<TreeViewListProps> = ({ rootId, people, onNavigate, highlightedPersonId }) => {
  const rootPerson = people[rootId];

  if (!rootPerson) {
    return <div className="p-4 text-center text-gray-500">პიროვნება ვერ მოიძებნა.</div>;
  }

  const parents = rootPerson.parentIds.map(id => people[id]).filter(Boolean);
  const spouse = rootPerson.spouseId ? people[rootPerson.spouseId] : null;
  const children = rootPerson.children.map(id => people[id]).filter(Boolean);

  return (
    <div className="w-full max-w-2xl mx-auto p-2 sm:p-4">
        {parents.length > 0 && (
            <Section title="მშობლები">
                {parents.map(p => (
                    <ListItem 
                        key={p.id} 
                        person={p} 
                        onNavigate={onNavigate} 
                        isHighlighted={p.id === highlightedPersonId} 
                    />
                ))}
            </Section>
        )}

        <Section title="ოჯახი">
            <ListItem 
                person={rootPerson} 
                onNavigate={onNavigate} 
                isHighlighted={rootPerson.id === highlightedPersonId}
            />
            {spouse && (
                <ListItem 
                    key={spouse.id} 
                    person={spouse} 
                    onNavigate={onNavigate} 
                    isHighlighted={spouse.id === highlightedPersonId}
                    isSpouse
                />
            )}
        </Section>
        
        {children.length > 0 && (
            <Section title="შვილები">
                 {children.map(c => (
                    <ListItem 
                        key={c.id} 
                        person={c} 
                        onNavigate={onNavigate} 
                        isHighlighted={c.id === highlightedPersonId}
                    />
                ))}
            </Section>
        )}
    </div>
  );
};

export default TreeViewList;