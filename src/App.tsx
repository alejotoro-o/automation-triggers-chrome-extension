
import { useEffect, useState } from 'react';
import './App.css'
import ConfigTrigger from './components/ConfigTrigger';
import Trigger from './components/Trigger';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

export default function App() {

    const [isNewTrigger, setIsNewTrigger] = useState(false);
    const [triggers, setTriggers] = useState<{ [key: string]: any }[]>([]);

    useEffect(() => {
        retrieveTriggers();
    },[isNewTrigger]);

    function retrieveTriggers() {

        chrome.storage.local.get(null, (items) => {

            const triggers = Object.keys(items).filter((key) => key.startsWith('trigger_')) .map((key) => ({ id: key, ...items[key] }));;
            console.log('All stored triggers:', triggers);

            setTriggers(triggers);

        });

    }

    function deleteTrigger(triggerId: string) {
        chrome.storage.local.remove(triggerId, () => {
            console.log('Trigger with key', triggerId, 'deleted'); 
            retrieveTriggers();
        });
    }

    return (
        <main className='w-full'>
            <section className='m-4 p-4 text-center'>
                <img className='m-auto' src='images/logo.svg' alt='Automation Trigger Logo'/>
                <h1 className='text-3xl font-bold'>Automation Trigger</h1>
            </section>
            <section className='border-t-[1px] border-b-[1px] border-gray-400'>
                <div className='flex flex-row mt-1 mb-1 mx-4'>
                    <button className='hover:text-gray-400 transition-all duration-300' onClick={() => setIsNewTrigger(true)} style={{ display: isNewTrigger ? "none" : "block" }}><FontAwesomeIcon icon={faPlus}/> Add Trigger</button>
                    <button className='ml-auto hover:text-gray-400 transition-all duration-300' onClick={() => setIsNewTrigger(false)} style={{ display: isNewTrigger ? "block" : "none" }}>Cancel</button>
                </div>
            </section>
            <section className='flex m-4 overflow-y-auto'>
                <div style={{ display: isNewTrigger ? "block" : "none" }}>
                    <ConfigTrigger setIsNewTrigger={setIsNewTrigger}/>
                </div>
                <div style={{ display: isNewTrigger ? "none" : "block" }} className='w-full border-[1px] border-gray-200 rounded-md'>
                    {triggers.map((trigger) => (
                        <div key={trigger.id}>
                            <Trigger 
                            trigger_id={trigger.id} 
                            trigger_name={trigger.trigger_name} 
                            webhook_url={trigger.webhook_url}
                            auth_token={trigger.auth_required == "on" ? trigger.auth_token : ""}
                            deleteTrigger={deleteTrigger}/>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    )
}
