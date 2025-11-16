import React, { useState, useEffect } from 'react';
import { BiPlay, BiPause } from 'react-icons/bi';
import { Table, Button } from 'react-bootstrap';
import { fetchSongs } from '../services/SongService';
import background from '../assets/backround.webp';
import './Songs.css';

function Songs() {
    const [songs, setSongs] = useState([]);
    const [playingSongId, setPlayingSongId] = useState(null);
    const [audio, setAudio] = useState(null);

    useEffect(() => {
        const fetchAllSongs = async () => {
            try {
                const songsData = await fetchSongs();
                setSongs(songsData);
            } catch (error) {
                console.error('Error fetching songs:', error);
            }
        };
        fetchAllSongs();
    }, []);

    useEffect(() => {
        if (audio) {
            const handleEnded = () => {
                setPlayingSongId(null);
            };
            audio.addEventListener('ended', handleEnded);
            return () => {
                audio.removeEventListener('ended', handleEnded);
            };
        }
    }, [audio]);

    const togglePlay = (songId, songUrl) => {
        if (playingSongId === songId && audio && !audio.paused) {
            audio.pause();
            setPlayingSongId(null);
        } else {
            if (audio) audio.pause();
            const newAudio = new Audio(songUrl);
            newAudio.play();
            setAudio(newAudio);
            setPlayingSongId(songId);
        }
    };

    return (
        <div className="songs-page" style={{ backgroundImage: `url(${background})` }}>
            <div className="overlay">
                <div className="container-fluid songs-container py-5">
                    <h2 className="text-center text-white mb-4">All Songs</h2>
                    <Table striped bordered hover variant="dark" responsive className="rounded-3 overflow-hidden">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Artist</th>
                                <th>Genre</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {songs.map((song, index) => (
                                <React.Fragment key={song.id}>
                                    <tr>
                                        <td>{index + 1}</td>
                                        <td>{song.name}</td>
                                        <td>{song.artist}</td>
                                        <td>{song.genre}</td>
                                        <td>
                                            <Button
                                                variant="outline-light"
                                                size="sm"
                                                onClick={() => togglePlay(song.id, song.link)}
                                            >
                                                {playingSongId === song.id && audio && !audio.paused ? <BiPause /> : <BiPlay />}
                                            </Button>
                                        </td>
                                    </tr>
                                    {playingSongId === song.id && song.lyrics && (
                                        <tr className="bg-dark text-white">
                                            <td colSpan="5">
                                                <strong>Lyrics:</strong>
                                                <pre style={{ whiteSpace: 'pre-wrap', marginTop: '10px' }}>
                                                    {song.lyrics}
                                                </pre>
                                            </td>
                                        </tr>
                                    )}
                                </React.Fragment>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </div>
        </div>
    );
}

export default Songs;
