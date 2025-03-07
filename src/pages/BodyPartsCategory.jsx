import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/Categories.css';

const BodyPartsCategory = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [exercises, setExercises] = useState([]);

    useEffect(() => {
        if (id) {
            fetchData(id);
        }
    }, [id]); // ✅ Dependency array fixed

    const fetchData = async (id) => {
        const options = {
            method: 'GET',
            url: `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${id}`,
            params: { limit: '200' },
            headers: {
                'X-RapidAPI-Key': '8384a62498msh43bd6160aa3ddf4p10eac4jsnb8079ca0a398', // ✅ Secure API key
                'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
            },
        };

        try {
            const response = await axios.request(options);
            console.log(response.data);
            setExercises(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="category-exercises-page">
            <h1>Category: <span>{id}</span></h1>

            {exercises.length > 0 ? (
                <div className="exercises">
                    {exercises.map((exercise, index) => (
                        <div 
                            className="exercise" 
                            key={index} 
                            onClick={() => navigate(`/exercise/${exercise.id}`)}
                        >
                            <img src={exercise.gifUrl} alt={exercise.name} />
                            <h3>{exercise.name}</h3>
                            <ul>
                                <li>{exercise.target}</li>
                                {exercise.secondaryMuscles?.slice(0, 2).map((muscle, idx) => (
                                    <li key={idx}>{muscle}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No exercises found.</p>
            )}
        </div>
    );
};

export default BodyPartsCategory;
