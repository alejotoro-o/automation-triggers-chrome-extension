interface TriggerProps {
    trigger_name: string;
}

export default function Trigger ({trigger_name}: TriggerProps) {
    return (
        <div>
            <span>{trigger_name}</span>
        </div>
    );
}