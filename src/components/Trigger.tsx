import { faCircleRight, faCircleStop, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
        <div className="w-full">
            <div className={`flex flex-row w-[100%] hover:bg-gray-200 ${isRunning ? 'bg-gray-200' : ''} p-2`}>
                <h2 className="mr-4">{trigger_name}</h2>
                <button className="ml-auto mr-4" onClick={() => setIsRunning(!isRunning)}><FontAwesomeIcon className="text-green-500" icon={faCircleRight} style={{ display: isRunning ? "none" : "inline" }}/><FontAwesomeIcon  icon={faCircleStop} style={{ display: isRunning ? "inline" : "none" }}/></button>
                <button onClick={() => deleteTrigger(trigger_id)}><FontAwesomeIcon className="text-red-500" icon={faTrashCan}/></button>
            </div>
            <div style={{ display: isRunning ? "block" : "none" }} className="p-2">
                <h3 className="block font-bold mb-[2px]">Webhook URL:</h3>
                <span className="block break-all mb-[2px]">{webhook_url}</span>
                <h3 className="block font-bold mb-[2px]">Token:</h3>
                <span className="block break-all mb-[2px]">{auth_token}</span>
                <form onSubmit={handleSubmit}>
                    <div>
                        <input 
                        className="inline w-auto mr-2"
                        type="checkbox" 
                        id="use_params" 
                        name="use_params" 
                        checked={useParams} 
                        onChange={() => {setUseParams(!useParams)}}/>
                        <label className="inline w-auto" htmlFor="use_params">Add Data</label>
                    </div>
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
                    <button className="hover:text-green-500 transition-all duration-300" type="submit"><FontAwesomeIcon icon={faCircleRight} /></button>
                </form>
            </div>
        </div>
        
    );
}