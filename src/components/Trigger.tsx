import { useState } from "react";

interface TriggerProps {
    trigger_id: string;
    trigger_name: string;
    webhook_url: string;
    auth_token: string;
    deleteTrigger: (trigger_id: string) => void;
}

export default function Trigger ({trigger_id, trigger_name, webhook_url, auth_token="", deleteTrigger}: TriggerProps) {

    const [isRunning, setIsRunning] = useState(false);
    const [useParams,setUseParams] = useState(false);

    function handleSubmit(e: any) {

        e.preventDefault();
        
        const formData = new FormData(e.currentTarget);
        const formObject: { [key: string]: string } = {};

        if (useParams) {

            formData.forEach((value, key) => {
                formObject[key] = value as string;
            });

            console.log(formObject);

        }

        fetch(webhook_url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + auth_token,
            },
            body: JSON.stringify(formObject),
        }).then(response => response.json())
        .then(data => { 
            console.log('Success:', data);
        }) 
        .catch(error => { 
            console.error('Error:', error); 
        });

    }

    return (
        <div>
            <div>
                <h3>Trigger Name: {trigger_name}</h3>
                <p>Webhook URL: {webhook_url}</p>
                <p>token: {auth_token}</p>
                <button onClick={() => setIsRunning(!isRunning)}>Run Trigger</button>
                <button onClick={() => deleteTrigger(trigger_id)}>Delete Trigger</button>
            </div>
            <div style={{ display: isRunning ? "block" : "none" }}>
                <form onSubmit={handleSubmit}>
                    <input type="checkbox" id="use_params" name="use_params" checked={useParams} onChange={() => {setUseParams(!useParams)}}/>
                    <fieldset disabled={!useParams} style={{ display: useParams ? "block" : "none" }}>
                        <div>
                            <label htmlFor="title">Title</label>
                            <input
                            type="text"
                            id="title"
                            name="title"
                            required
                            />
                        </div>
                        <div>
                            <label htmlFor="description">Description</label>
                            <input
                            type="text"
                            id="description"
                            name="description"
                            required
                            />
                        </div>
                    </fieldset>
                    <button type="submit">Run Trigger</button>
                </form>
            </div>
        </div>
        
    );
}