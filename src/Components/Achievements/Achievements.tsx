import styles from "./Achievements.module.css";
import data from "../../../data.json";

const Achievements = () => {
    return (
        <div id="achievements" className={styles.AchievementsWrapper}>
            <h1>Achievements</h1>
            <div className={styles.achievementsContainer}>
                {data.achievements.map((achievement, index) => (
                    <div key={index} className={styles.achievementCard}>
                        <div className={styles.achievementImage}>
                            <img src={achievement.image} alt={achievement.title} />
                        </div>
                        <div className={styles.achievementInfo}>
                            <h3>{achievement.title}</h3>
                            <p>{achievement.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Achievements;
