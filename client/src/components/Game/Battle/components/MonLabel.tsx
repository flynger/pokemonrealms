import "./MonLabel.css";

interface IProps {
    name: string,
    level: number,
    shiny: boolean
}

export default function MonLabel({ name, level, shiny }: IProps) {
    return (
        <div className="info-row">
            <span className={shiny ? 'gold' : ''}>{name}</span>
            <div className="level-container">
                <span className="level-label">Lv</span>
                <span className="level">{level}</span>
            </div>
        </div>
    )
}