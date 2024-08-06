import "./XpBar.css";
interface IProps {
    percent: number
}
export default function XpBar({ percent }: IProps) {
    return (
        <div id="xpbar-bg">
            <div id="xpbar" style={{ width: `${percent}%` }}></div>
        </div>
    );
}