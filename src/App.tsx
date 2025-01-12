
import { useEffect, useState } from 'react';
import './App.css'
import ConfigTrigger from './components/ConfigTrigger';

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
            // Object.keys(items).forEach((key) => {
            //   if (key.startsWith('trigger_')) {
            //     console.log('Trigger key:', key, 'Value:', items[key]);
            //   }
            // });
            setTriggers(triggers);
        });

    }

    function addNewTrigger() {
        setIsNewTrigger(true);
    }

    return (
        <main>
            <section>
                <h1>Automation Trigger</h1>
            </section>
            <section>
                <div>
                    <button onClick={addNewTrigger}>Add Trigger</button>
                </div>
            </section>
            <section>
                <div style={{ display: isNewTrigger ? "block" : "none" }}>
                    <ConfigTrigger setIsNewTrigger={setIsNewTrigger}/>
                </div>
                <div style={{ display: isNewTrigger ? "none" : "block" }}>
                    {triggers.map((trigger) => (
                        <div key={trigger.id}>
                            <h3>Trigger ID: {trigger.id}</h3>
                            <h3>Trigger Name: {trigger.trigger_name}</h3>
                            <p>Webhook URL: {trigger.webhook_url}</p>
                            <p>Authentication Token: {trigger.auth_token}</p>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    )
}
