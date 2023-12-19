import React from 'react';
import { useState } from 'react';
import '../Addpet/styleaddpet.css';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";

const Addpet = () => {
    const [showText, setShowText] = useState(true);
    const [imageUrl, setImageUrl] = useState('');
    const [imageName, setImageName] = useState('');
    const navigate = useNavigate()
    const [pet, setPet] = useState({
        petPfp: "",
        petName: "",
        petType: "",
        petGender: "",
        petDoB:""
    });

    const [file, setFile] = useState(null)
    axios.defaults.withCredentials = true;

    const handleImgChange = (e) => {
        const image = e.target.files[0];
        if (image.size < 2000000) {
          const reader = new FileReader();
    
          reader.onload = () => {
            setImageUrl(reader.result);
            setImageName(image.name);
          };
          setShowText(false);
          reader.readAsDataURL(image);
          
          
        } else {
          alert("Image size more than 2MB");
        }
      };


    const handleChange = (e) => {
        setPet((prev) => ({ ...prev, [e.target.name]: e.target.value}))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const formData = new FormData();
        formData.append("petPfp", file);
        formData.append("petName", pet.petName);
        formData.append("petType", pet.petType);
        formData.append("petGender", pet.petGender);
        formData.append("petDoB", pet.petDoB)

        const config = {
            headers:{
                "Content-Type":"multipart/form-data"
            }
        }
        try{
            console.log("formdata" + URL.createObjectURL([...formData][0]))
            const respet = await axios.post("http://localhost:3009/petregister", formData, config) 
            if(respet.data.status === "error"){
                alert(respet.data.error)
            }
            else{
                alert(respet.data.success)
                navigate('/home')
            }
        }
        catch(err){console.error(err)}
    }

    return (
        <div className='addpet'>
        <Helmet>
            <meta charset="UTF-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            <title>Add pet</title>
            <link rel="preconnect" href="https://fonts.googleapis.com"/>
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
            <link href="https://fonts.googleapis.com/css2?family=Catamaran:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet"/>
            <script src="https://kit.fontawesome.com/957263c2c4.js" crossorigin="anonymous"></script>
        </Helmet>
        <div class="back">
                <a href="/home"><Link to='/home'><i class="fa-solid fa-chevron-left fa-3x"></i></Link></a>
        </div>
        <main>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="container">
  <div className="img-area" data-img="">
    {imageUrl && (
      <div className="img-area active" data-img={imageName}>
        <img src={imageUrl} alt="Uploaded" />
      </div>
    )}

    {imageUrl ? null : (
      <div className="text">
        <i className="bx bxs-cloud-upload icon"></i>
        <h3>Upload Image</h3>
        <p>Image size must be less than <span>2MB</span></p>
      </div>
    )}
  </div>
  <input type="file" id="file" name="petPfp" onChange={handleImgChange} multiple={false} />
</div>

                <div class="textinfo">
                    <label for="name">Name</label>
                    <input id="name" type="text" placeholder="Name" name="petName" onChange={handleChange} />
                    <label for="type">Type</label>
                    <select id="type" name="petType" onChange={handleChange}>
                        <option value="None">None</option>
                        <option value="Dog">Dog</option>
                        <option value="Cat">Cat</option>
                    </select>
                    <p>Gender</p>
                    <div class="selectGender">
                        <div>
                            <input id="male" type="radio" value="Male" name="petGender" onChange={handleChange}/>
                            <label for="male">Male</label>
                        </div>
                        <div>
                            <input id="female" type="radio" value="Female" name="petGender" onChange={handleChange}/>
                            <label for="female">Female</label>
                        </div>
                    </div>

                    <label for="DoB">Birthday:</label>
                    <input id="DoB" type="date" name="petDoB" onChange={handleChange}/>
                    <div class="CancelAndSubmit">
                        <button id="cancel" class="button">Cancel</button>
                        <button id="submit" className="button" type="submit" name="submit" onClick={handleSubmit} variant="primary">Submit</button>
                    </div>
                </div>
            </form>
        </main>

        <nav class="navigate">
            <Link to="/articles"><a href="/articles"><i class="fa-solid fa-book-open fa-2x"></i></a></Link>
            <Link to="/home"><a href="/home"><i class="fa-solid fa-house fa-2x"></i></a></Link>
            <Link to="/calendar"><a href="/calendar"><i class="fa-regular fa-calendar-days fa-2x"></i></a></Link>
        </nav>
        </div>
    )
}

export default Addpet;