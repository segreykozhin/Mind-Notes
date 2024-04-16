import styles from './JournalForm.module.css';
import Button from '../Button/Button';
import { useContext, useEffect, useReducer, useRef } from 'react';
import cn from 'classnames';
import { INITIAL_STATE, formReducer } from './JournalForm.state';
import Input from '../Input/Input';
import { UserContext } from '../../context/user.context';

function JournalForm({ onSubmit, data }) {
	const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE);
	const {isValid, isFormReadyToSubmit, values} = formState;
	const titleRef = useRef();
	const dateRef = useRef();
	const postRef = useRef();
	const { userId } = useContext(UserContext);

	const focusError = (isValid) => {
		switch(true) {
		case !isValid.title:
			titleRef.current.focus();
			break;
		case !isValid.date:
			dateRef.current.focus();
			break;
		case !isValid.post:
			postRef.current.focus();
			break;
		}
	};

	useEffect(() => {
		dispatchForm({type: 'SET_VALUE', payload: {...data}});
	}, [data]);

	useEffect(()=>{
		let timerId;
		if (!isValid.date || !isValid.post || !isValid.title) {
			timerId = setTimeout(()=> {
				focusError(isValid);
				dispatchForm({type: 'RESET_VALIDITY'});
			}, 2000);
		}
		return ()=> {
			clearTimeout(timerId);
		};
	},[isValid]);

	useEffect(() => {
		if (isFormReadyToSubmit) {
			onSubmit(values);
			dispatchForm({type: 'CLEAR'});
			dispatchForm({type: 'SET_VALUE', payload: {userId}});
		}
	}, [isFormReadyToSubmit, values, onSubmit, userId]);

	useEffect(() => {
		dispatchForm({type: 'SET_VALUE', payload: {userId}});
	}, [userId]);

	const addJournalItem = (e) => {
		e.preventDefault();
		dispatchForm({type: 'SUBMIT'});
	};

	const onChange = (e) => {
		dispatchForm({type: 'SET_VALUE', payload: {
			[e.target.name]: e.target.value
		}});
	};

	return (

		<form className={styles['journal-form']} onSubmit={addJournalItem}>
			<div className={styles['form-row']}>
				<Input type="text" ref={titleRef} isValid={isValid.title} onChange={onChange} value={values.title} name="title" appearence='title'/>
				{data?.id && <button className={styles['delete']} type="button" >
					<img src="/archive.svg" alt="Кнопка удалить" />
				</button>}
			</div>
			<div className={styles['form-row']}>
				<label htmlFor='date' className={styles['form-label']}>
					<img src="/public/calendar.svg" alt="Иконка календаря"/>
					<span>Дата</span>
				</label>
				<Input type='date' ref={dateRef} onChange={onChange} name='date' value={values.date ? new Date(values.date).toISOString().slice(0, 10) : ''} id="date" isValid={isValid.title}/>
			</div>
			<div className={styles['form-row']}>
				<label htmlFor='tag' className={styles['form-label']}>
					<img src="/public/folder.svg" alt="Иконка календаря"/>
					<span>Метки</span>
				</label>
				<Input id='tag' onChange={onChange} value={values.tag} type='text' name='tag' />
			</div>
			<textarea name='post' ref={postRef} onChange={onChange} value={values.post} id='post' cols='30' rows='10' className={cn(styles['input'], {
				[styles['invalid']]: !isValid.post
			})}/>
			<Button text='Сохранить' onClick={()=>{console.log('Нажали');}}/>
		</form>	
	);
}

export default JournalForm;