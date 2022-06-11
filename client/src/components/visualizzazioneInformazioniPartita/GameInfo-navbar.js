const GameInfoNavBar = (props) => {
    
    return (
        <div className="button-statistics">
            <button className="choose_statistic" onClick={() => props.setInfo("game_stats")}>
                Game Statistics
            </button>
            <button className="choose_statistic" onClick={() => {props.setInfo("home"); props.setPlayerInfo(false)}}>
                Home Players
            </button>
            <button className="choose_statistic" onClick={() => {props.setInfo("visitors"); props.setPlayerInfo(false)}}>
                Visitors Players
            </button>
            <button className="choose_statistic" onClick={() => {props.setInfo(""); props.setPlayerInfo(false)}}>
                Cancel View
            </button>
        </div>
    )
}

export default GameInfoNavBar;