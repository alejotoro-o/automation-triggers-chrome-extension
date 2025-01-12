import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';

interface ConfigTriggerProps { 
    setIsNewTrigger: (value: boolean) => void; 
}

export default function ConfigTrigger ({setIsNewTrigger}: ConfigTriggerProps) {

  const [triggerName, setTriggerName] = useState('');
  const [webhookUrl, setWebhookUrl] = useState('');
  const [useAuth, setUseAuth] = useState(false);
  const [authToken, setAuthToken] = useState('');

  function generateBearerToken(): void {
    const array = new Uint8Array(32);
    window.crypto.getRandomValues(array);
    setAuthToken(Array.from(array, (byte) => byte.toString(16).padStart(2, '0')).join(''));
  }  

  const handleSubmit = (e: any) => {

    e.preventDefault();
    
    const formData = new FormData(e.currentTarget);
    const formObject: { [key: string]: string } = {};

    formData.forEach((value, key) => {
      formObject[key] = value as string;
    });

    console.log(formObject);

    const uniqueKey = `trigger_${Date.now()}`;

    // Save the JSON object with the unique key 
    chrome.storage.local.set({ [uniqueKey]: formObject }, () => { 
      console.log('Trigger saved with key:', uniqueKey); 
    });

    setTriggerName('');
    setWebhookUrl('');
    setUseAuth(false);
    setAuthToken('');
    setIsNewTrigger(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="trigger_name">Trigger Name</label>
        <input
          type="text"
          id="trigger_name"
          name="trigger_name"
          value={triggerName}
          onChange={(e) => setTriggerName(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="webhook_url">Webhook URL</label>
        <input
          type="text"
          id="webhook_url"
          name="webhook_url"
          value={webhookUrl}
          onChange={(e) => setWebhookUrl(e.target.value)}
          required
        />
      </div>
      <div>
        <input
        className='inline w-auto mr-2' 
        type='checkbox'
        id='auth_required' 
        name='auth_required' 
        checked={useAuth} 
        onChange={() => {setUseAuth(!useAuth)}}/>
        <label className='inline w-auto' htmlFor='auth_required'>Use Authentication</label>
      </div>
      <div>
        <label htmlFor="auth_token">Authentication Token</label>
        <input
          type="text"
          id="auth_token"
          name="auth_token"
          value={authToken}
          onChange={(e) => setAuthToken(e.target.value)}
          disabled={!useAuth}
          required
        />
        <button className='mb-2 cursor-pointer text-blue-600 hover:underline transition-all duration-300' type='button' onClick={generateBearerToken} disabled={!useAuth}>Generate Token</button>
      </div>
      <button className='p-2 border-[1px] rounded-md border-gray-400 hover:bg-gray-200 transition-all duration-300' type="submit"><FontAwesomeIcon icon={faFloppyDisk} /> Save Trigger</button>
    </form>
  );
};
