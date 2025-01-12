import React, { useState } from 'react';

interface ConfigTriggerProps { 
    setIsNewTrigger: (value: boolean) => void; 
}

const ConfigTrigger: React.FC<ConfigTriggerProps> = ({setIsNewTrigger}) => {

  const [webhookUrl, setWebhookUrl] = useState('');
  const [authToken, setAuthToken] = useState('');

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setIsNewTrigger(false);
    console.log("Hola")
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="webhook-url">Webhook URL</label>
        <input
          type="text"
          id="webhook-url"
          name="webhook-url"
          value={webhookUrl}
          onChange={(e) => setWebhookUrl(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="auth-token">Authentication Token</label>
        <input
          type="text"
          id="auth-token"
          name="auth-token"
          value={authToken}
          onChange={(e) => setAuthToken(e.target.value)}
          required
        />
      </div>
      <button type="submit">Save Trigger</button>
    </form>
  );
};

export default ConfigTrigger;
