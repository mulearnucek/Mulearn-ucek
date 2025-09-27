import { useParams, Navigate } from "react-router-dom";
import styles from "./TeamMember.module.css";
import { teamMembers } from "../../data/teamData";
import { FaEnvelope } from "react-icons/fa";

const TeamMember = () => {
    const { memberName } = useParams<{ memberName: string }>();
    
    // Find the team member by ID
    const member = teamMembers.find(m => m.id === memberName);
    
    console.log('Looking for member:', memberName);
    console.log('Found member:', member);
    
    // If member not found, redirect to team page
    if (!member) {
        return <Navigate to="/#team" replace />;
    }
    
    return (
        <div className={styles.linkTreeWrapper}>
            <div className={styles.container}>
                <div className={styles.backButton}>
                    <a href="/#team">← Back to Team</a>
                </div>
                
                {/* Profile Section */}
                <div className={styles.profileSection}>
                    <div className={styles.profileImage}>
                        <img 
                            src={`/${member.image.replace(/\s+/g, '%20')}`}
                            alt={member.name}
                            onError={(e) => {
                                console.log('Image failed to load:', member.image);
                                console.log('Attempted URL:', `/${member.image.replace(/\s+/g, '%20')}`);
                                // Try without URL encoding as fallback
                                e.currentTarget.src = `/${member.image}`;
                            }}
                        />
                    </div>
                    <h1 className={styles.memberName}>{member.name}</h1>
                </div>

                {/* Member Information */}
                <div className={styles.infoSection}>
                    <div className={styles.infoItem}>
                        <span className={styles.infoLabel}>Name</span>
                        <span className={styles.infoValue}>{member.name}</span>
                    </div>
                    
                    <div className={styles.infoItem}>
                        <span className={styles.infoLabel}>Team</span>
                        <span className={styles.infoValue}>{member.team}</span>
                    </div>
                    
                    <div className={styles.infoItem}>
                        <span className={styles.infoLabel}>Email</span>
                        <span className={styles.infoValue}>
                            <a href={`mailto:${member.email}`} className={styles.emailLink}>
                                {member.email}
                            </a>
                        </span>
                    </div>
                    
                    <div className={styles.infoItem}>
                        <span className={styles.infoLabel}>Gender</span>
                        <span className={styles.infoValue}>{member.gender}</span>
                    </div>
                    
                    <div className={styles.infoItem}>
                        <span className={styles.infoLabel}>Batch</span>
                        <span className={styles.infoValue}>{member.batch}</span>
                    </div>
                    
                    <div className={styles.infoItem}>
                        <span className={styles.infoLabel}>Position</span>
                        <span className={styles.infoValue}>{member.role}</span>
                    </div>
                </div>

                {/* Email Compose Button */}
                <div className={styles.actionSection}>
                    <a 
                        href={`mailto:${member.email}`}
                        className={styles.composeEmailBtn}
                    >
                        <FaEnvelope />
                        <span>Compose Email</span>
                    </a>
                </div>

                {/* MuLearn UCEK Branding */}
                <div className={styles.brandingSection}>
                    <p>Member of MuLearn UCEK Community</p>
                    <a href="/#home" className={styles.brandLink}>
                        Visit MuLearn UCEK
                    </a>
                </div>
            </div>
        </div>
    );
};

export default TeamMember;