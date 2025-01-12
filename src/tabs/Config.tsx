import { useState } from "react";
import ConfigTrigger from "../components/ConfigTrigger";

export default function Config () {

    const [isNewTrigger, setIsNewTrigger] = useState(false);

    function addNewTrigger() {
        setIsNewTrigger(true);
    }

    return (
        <section>
            <div>
                <button onClick={addNewTrigger}>Add Trigger</button>
            </div>
            <div>
                <h1 style={{ display: isNewTrigger ? "none" : "block" }}>Triggers</h1>
                <div style={{ display: isNewTrigger ? "block" : "none" }}>
                    <ConfigTrigger setIsNewTrigger={setIsNewTrigger}/>
                </div>
            </div>
        </section>
    );
}