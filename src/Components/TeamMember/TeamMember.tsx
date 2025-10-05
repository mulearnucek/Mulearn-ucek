import { useParams, Navigate } from "react-router-dom";
import { useMemo, useState, useRef } from "react";
import styles from "./TeamMember.module.css";
import { useTeamMembers } from "../../hooks/useTeamMembers";
import { isValidTeamRoute, getMemberNameFromPath } from "../../data/staticTeamRoutes";
import { FaInstagram, FaLinkedinIn, FaGithub, FaExternalLinkAlt } from "react-icons/fa";

const TeamMember = () => {
    const { memberName } = useParams<{ memberName: string }>();
    const { teamMembers, loading, error } = useTeamMembers();
    const [imageError, setImageError] = useState(false);
    const imageRetryCount = useRef(0);
    const MAX_RETRIES = 3;
    
    // Check if the route is allowed
    const isValidRoute = useMemo(() => {
        return memberName ? isValidTeamRoute(memberName) : false;
    }, [memberName]);
    
    // If route is not in the allowed list, redirect immediately
    if (!isValidRoute && !loading) {
        return <Navigate to="/#team" replace />;
    }
    
    // Get the full member name from the route mapping
    const fullMemberName = useMemo(() => {
        return memberName ? getMemberNameFromPath(memberName) : undefined;
    }, [memberName]);
    
    // Memoize the member lookup to prevent unnecessary re-renders
    // Match by exact full name to handle duplicates
    const member = useMemo(() => {
        if (!fullMemberName) return undefined;
        
        // Find by exact name match (case-insensitive)
        const found = teamMembers.find(m => 
            m.name.toLowerCase().trim() === fullMemberName.toLowerCase().trim()
        );
        
        return found;
    }, [teamMembers, fullMemberName]);
    
    // Only log once when component mounts or member changes
    useMemo(() => {
        if (memberName) {
            console.log('Route path:', memberName);
            console.log('Looking for member name:', fullMemberName);
            console.log('Found member:', member);
            if (member) {
                console.log('Member MuID:', member.muId);
                console.log('Member full data:', JSON.stringify(member, null, 2));
            }
        }
    }, [memberName, fullMemberName, member]);
    
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
    
    // If member not found, show debug info instead of redirecting
    if (!member && !loading) {
        return (
            <div className={styles.linkTreeWrapper}>
                <div className={styles.container}>
                    <div className={styles.errorState}>
                        <h2>Member not found</h2>
                        <p>Looking for: {memberName}</p>
                        <p>Available IDs: {teamMembers.map(m => m.id).join(', ')}</p>
                        <a href="/#team">← Back to Team</a>
                    </div>
                </div>
            </div>
        );
    }
    
    // Return null if still loading or member not ready
    if (!member) {
        return null;
    }
    
    return (
        <div className={styles.linkTreeWrapper}>
            <div className={styles.container}>
                {/* Profile and Member Information */}
                <div className={styles.infoSection}>
                    <div style={{ textAlign: 'center', marginBottom: '16px', paddingBottom: '16px', borderBottom: '1px solid rgba(0, 0, 0, 0.06)' }}>
                        <div className={styles.profileImage}>
                            {!imageError ? (
                                <img 
                                    src={`/${member.image.replace(/\s+/g, '%20')}`}
                                    alt={member.name}
                                    loading="lazy"
                                    style={{ width: '88px', height: '88px' }}
                                    onError={(e) => {
                                        imageRetryCount.current += 1;
                                        console.log(`Image load attempt ${imageRetryCount.current} failed for:`, member.image);
                                        
                                        if (imageRetryCount.current < MAX_RETRIES) {
                                            // Retry with different URL format
                                            const target = e.currentTarget;
                                            setTimeout(() => {
                                                target.src = `/${member.image}`;
                                            }, 500);
                                        } else {
                                            console.log('Max retries reached. Stopping image load attempts.');
                                            setImageError(true);
                                        }
                                    }}
                                />
                            ) : (
                                <div style={{ 
                                    width: '88px', 
                                    height: '88px', 
                                    borderRadius: '50%', 
                                    background: 'linear-gradient(135deg, #667eea, #764ba2)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'white',
                                    fontSize: '32px',
                                    fontWeight: 'bold'
                                }}>
                                    {member.name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || '??'}
                                </div>
                            )}
                        </div>
                        <h1 style={{ fontSize: '1.4rem', margin: '8px 0 4px' }}>{member.name}</h1>
                        {member.muId && (
                            <p style={{ fontSize: '0.75rem', color: '#666', fontWeight: '500', margin: '0' }}>
                                {member.muId}
                            </p>
                        )}
                    </div>

                    <div className={styles.infoItem}>
                        <span className={styles.infoLabel}>Team</span>
                        <span className={styles.infoValue}>{member.team}</span>
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

                {/* MuLearn UCEK Link */}
                <div style={{ textAlign: 'center', marginTop: '7px' }}>
                    <a href="/#home" className={styles.brandLink}>
                        Visit MuLearn UCEK
                    </a>
                </div>
            </div>
        </div>
    );
};

export default TeamMember;