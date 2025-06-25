'use client'
import { useSocket } from '@/contexts/socket';
import { useEffect, useRef, useState } from 'react';
import { sendReaction as sendReactionAPI } from '@/actions/game.action';

const REACTIONS = {
    like: '👍',
    heart: '❤️',
    laugh: '😂',
    wow: '😮',
    sad: '😢',
    angry: '😠'
};

export const ReactionSender = ({ assignmentId, winnerMemberId, currentMemberId, currentEmail }) => {
    const socket = useSocket();
    const [sending, setSending] = useState(false);
    const [lastSent, setLastSent] = useState(null);
    const [error, setError] = useState(null);

    const handleSendReaction = async (type) => {
        if (sending) return;

        setSending(true);
        setError(null);

        try {
            const { data, error: apiError } = await sendReactionAPI(
                assignmentId,
                winnerMemberId,
                currentEmail,
                currentMemberId,
                type
            );

            // console.log(data, apiError)

            if (apiError) {
                setError(apiError);
                return;
            }

            setLastSent({ type, time: Date.now() });
        } catch (err) {
            setError('Failed to send reaction');
            console.error('Reaction error:', err);
        } finally {
            setSending(false);
        }
    };

    return (
        <div className="relative">
            <div className="flex gap-2 justify-center bg-white ">
                {Object.entries(REACTIONS).map(([type, emoji]) => (
                    <button
                        key={type}
                        onClick={() => handleSendReaction(type)}
                        disabled={sending}
                        className={`p-2 rounded-full transition-all ${lastSent?.type === type ? 'bg-blue-100 scale-110' : 'hover:bg-gray-100'} ${sending ? 'opacity-50' : ''}`}
                        aria-label={`Send ${type} reaction`}
                    >
                        <span className="text-xl">{emoji}</span>
                    </button>
                ))}
            </div>

            {error && (
                <div className="absolute top-full mt-1 text-red-500 text-sm">
                    {error}
                </div>
            )}
        </div>
    );
};

export const ReactionReceiver = ({ memberId, assignmentId }) => {
    const [reactions, setReactions] = useState([]);
    const socket = useSocket();
    const containerRef = useRef(null);

    useEffect(() => {
        if (!socket) return;

        socket.emit('join_member_room', memberId);
        socket.emit('join_assignment', assignmentId);

        const handleNewReaction = (data) => {
            if (data.winnerMemberId === memberId && containerRef.current) {
                const container = containerRef.current;
                setReactions(prev => [
                    ...prev,
                    {
                        id: Date.now() + Math.random().toString(36).substring(2, 9),
                        type: data.reactionType,
                        sender: data.senderEmail,
                        x: Math.random() * 100,
                        y: 100, // Start at bottom
                        opacity: 1,
                        speed: 0.5 + Math.random() * 1.5 // Random speed
                    }
                ]);
            }
        };

        socket.on('new_reaction', handleNewReaction);

        // Animation frame for smooth movement
        let animationFrameId;
        const animate = () => {
            setReactions(prev => 
                prev.map(r => ({
                    ...r,
                    y: r.y - r.speed, // Move upward
                    opacity: r.opacity - 0.002 // Fade slowly
                })).filter(r => r.y > -10 && r.opacity > 0) // Remove when off-screen or invisible
            );
            animationFrameId = requestAnimationFrame(animate);
        };
        animationFrameId = requestAnimationFrame(animate);

        return () => {
            socket.off('new_reaction', handleNewReaction);
            cancelAnimationFrame(animationFrameId);
        };
    }, [socket, memberId, assignmentId]);

    return (
        <div 
            ref={containerRef}
            className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden"
        >
            {reactions.map(reaction => (
                <div
                    key={reaction.id}
                    className="absolute text-2xl transition-all duration-1000 will-change-transform"
                    style={{
                        left: `${reaction.x}%`,
                        top: `${reaction.y}%`,
                        opacity: reaction.opacity,
                        transform: `translate(-50%, -50%)`,
                        zIndex: 10,
                        transition: 'none' // Disable CSS transition for smooth animation
                    }}
                    title={`From ${reaction.sender}`}
                >
                    {REACTIONS[reaction.type] || '❓'}
                </div>
            ))}
        </div>
    );
};