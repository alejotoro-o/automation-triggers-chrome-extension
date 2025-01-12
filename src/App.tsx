
import { useEffect, useState } from 'react';
import './App.css'
import ConfigTrigger from './components/ConfigTrigger';
import Trigger from './components/Trigger';

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
        <main>
            <section>
                <h1>Automation Trigger</h1>
            </section>
            <section>
                <div>
                    <button onClick={() => setIsNewTrigger(true)}>Add Trigger</button>
                </div>
            </section>
            <section>
                <div style={{ display: isNewTrigger ? "block" : "none" }}>
                    <ConfigTrigger setIsNewTrigger={setIsNewTrigger}/>
                </div>
                <div style={{ display: isNewTrigger ? "none" : "block" }}>
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
