import CardButton from '../CardButton/CardButton';
import './JournalAddButton.css';

function JournalAddButton({clearForm}) {
	return (
		<CardButton className="journal-add" onClick={clearForm}>
			<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
				<path d="M10 4.16666V15.8333" stroke="#3B4394" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
				<path d="M4.16669 10H15.8334" stroke="#3B4394" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
			</svg>
            Новое воспоминание
		</CardButton>
	);
}

export default JournalAddButton;