import styles from "./Team.module.css";
import line from "./assets/line.png";
import line2 from "./assets/line2.png";
import { teamMembers } from "../../data/teamData";

const Team = () => {
  return (
    <div className={styles.teamWrapper} id="team">
      <h1>Our Team</h1>
      <div className={styles.teamBodyWrapper}>
        <div className={styles.teamBgLineWrapper}>
          <img src={line} alt="" loading="lazy" />
          <img src={line2} alt="" loading="lazy" />
          <img src={line} alt="" loading="lazy" />
          <img src={line2} alt="" loading="lazy" />
          <img src={line} alt="" loading="lazy" />
        </div>
        <div className={styles.teamMembersDetailsWrapper}>
          {teamMembers.map((member, index) => (
            <div 
              key={member.id}
              className={`${styles.team} ${styles[`team${index + 1}`]}`}
            >
              <div className={styles.team1Img}>
                <img
                  className={styles.teamImageIndividual}
                  src={`/${member.image.replace(/\s+/g, '%20')}`}
                  alt={member.name}
                  loading="lazy"
                />
              </div>
              <div className={styles.teamNameDesignation}>
                <div className={styles.teamMemberName}>
                  {member.name}
                </div>
                <div className={styles.teamMemberDesignation}>{member.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Team;
