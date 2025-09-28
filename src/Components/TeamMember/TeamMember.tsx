import { useParams, Navigate } from "react-router-dom";
import { useMemo } from "react";
import styles from "./TeamMember.module.css";
import { useTeamMembers } from "../../hooks/useTeamMembers";
import { FaEnvelope, FaInstagram, FaLinkedinIn, FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { getImageUrl, handleImageError } from "../../utils/imageUtils";

const TeamMember = () => {
    const { memberName } = useParams<{ memberName: string }>();
    const { teamMembers, loading, error } = useTeamMembers();
    
    // Memoize the member lookup to prevent unnecessary re-renders
    const member = useMemo(() => {
        return teamMembers.find(m => m.id === memberName);
    }, [teamMembers, memberName]);
    
    // Only log once when component mounts or member changes
    useMemo(() => {
        if (memberName) {
            console.log('Looking for member:', memberName);
            console.log('Found member:', member);
        }
    }, [memberName, member]);
    
    // Show loading state
    if (loading) {
        return (
            <div className={styles.linkTreeWrapper}>
                <div className={styles.container}>
                    <div className={styles.loadingState}>
                        <h2>Loading team member...</h2>
                    </div>
                </div>
            </div>
        );
    }
    
    // Show error state
    if (error) {
        return (
            <div className={styles.linkTreeWrapper}>
                <div className={styles.container}>
                    <div className={styles.errorState}>
                        <h2>Error loading team data</h2>
                        <p>{error}</p>
                        <a href="/#team">← Back to Team</a>
                    </div>
                </div>
            </div>
        );
    }
    
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
                            src={getImageUrl(member.image)}
                            alt={member.name}
                            loading="lazy"
                            onError={(e) => handleImageError(e, member.image)}
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
                        <span className={styles.infoLabel}>Position</span>
                        <span className={styles.infoValue}>{member.role}</span>
                    </div>
                </div>

                {/* Social Links Section */}
                {member.socialLinks && member.socialLinks.length > 0 && (
                    <div className={styles.socialSection}>
                        <h3 className={styles.socialTitle}>Connect with me</h3>
                        <div className={styles.socialLinks}>
                            {member.socialLinks.map((social, index) => {
                                let IconComponent = FaExternalLinkAlt;
                                
                                // Choose appropriate icon based on platform
                                switch (social.icon.toLowerCase()) {
                                    case 'instagram':
                                        IconComponent = FaInstagram;
                                        break;
                                    case 'linkedin':
                                        IconComponent = FaLinkedinIn;
                                        break;
                                    case 'github':
                                        IconComponent = FaGithub;
                                        break;
                                    case 'mulearn':
                                        IconComponent = FaExternalLinkAlt;
                                        break;
                                    default:
                                        IconComponent = FaExternalLinkAlt;
                                }
                                
                                return (
                                    <a 
                                        key={index}
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={styles.socialLink}
                                        style={{ '--social-color': social.color } as React.CSSProperties}
                                    >
                                        <IconComponent />
                                        <span>{social.name}</span>
                                    </a>
                                );
                            })}
                        </div>
                    </div>
                )}

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