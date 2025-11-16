import React, { useState } from 'react';
import addSong from '../services/SongService';

function AddSong() {
    const [name, setName] = useState("");
    const [artist, setArtist] = useState("");
    const [genre, setGenre] = useState("");
    const [link, setLink] = useState("");
    const [lyrics, setLyrics] = useState("");

    const [msg, setMsg] = useState("");

    const AddSong = async (e) => {
        e.preventDefault();

        const song = { name, artist, genre, link, lyrics };

        try {
            const response = await addSong(song);
            if (response) {
                console.log(response);
                setMsg("Song added successfully");
            }
        } catch (error) {
            console.error('Error:', error);
            setMsg("Failed to add song");
        }
    };

    return (
        <div>
            <div className='container'>
                <br /><br />
                <div className="row">
                    <div className="card col-md-8 offset-md-2 shadow">
                        <h2 className='text-center m-2'>Add Song</h2>
                        <div className="card-body">
                            <form onSubmit={AddSong}>
                                <div className="form-group mb-2">
                                    <label className='form-label'>Name:</label>
                                    <input type="text" placeholder='Enter song name' value={name}
                                        className='form-control' onChange={(e) => setName(e.target.value)} required />
                                </div>
                                <div className="form-group mb-2">
                                    <label className='form-label'>Artist:</label>
                                    <input type="text" placeholder='Enter artist name' value={artist}
                                        className='form-control' onChange={(e) => setArtist(e.target.value)} required />
                                </div>
                                <div className="form-group mb-2">
                                    <label className='form-label'>Genre:</label>
                                    <input type="text" placeholder='Enter genre' value={genre}
                                        className='form-control' onChange={(e) => setGenre(e.target.value)} required />
                                </div>
                                <div className="form-group mb-2">
                                    <label className='form-label'>Link:</label>
                                    <input type="text" placeholder='Enter song link' value={link}
                                        className='form-control' onChange={(e) => setLink(e.target.value)} required />
                                </div>
                                <div className="form-group mb-2">
                                    <label className='form-label'>Lyrics:</label>
                                    <textarea placeholder='Enter lyrics here' value={lyrics}
                                        className='form-control' rows={5}
                                        onChange={(e) => setLyrics(e.target.value)} required />
                                </div>
                                <div className='text-center'>
                                    <button className='btn btn-success' type='submit'>Add Song</button>
                                </div>
                            </form>
                        </div>
                        {msg && <h6 className="text-center border border-dark p-2 rounded text-danger">{msg}</h6>}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddSong;
