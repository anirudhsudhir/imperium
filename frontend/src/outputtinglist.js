import { useState } from "react";

const Home = () => {
    //let name1 = "Kratos"; // this value isnt reactive hence it doesn't change on template
    const [name1,setName] = useState("Anshul");
    const [blogs , setBlogs] = useState([
        { title: 'My new website', body: 'lorem ipsum...', author: 'Alexander', id: 1 },
        { title: 'Welcome party!', body: 'lorem ipsum...', author: 'Lovecraft', id: 2 },
        { title: 'Web dev top tips', body: 'lorem ipsum...', author: 'mario', id: 3 }
    ]);// react useState hook is used here React.useState("")
    const handleClick = (e) => {
        setName('Athreya');
       
    }
    return (
        <div className="Home">
            <h2>Imagination is vocalized <br></br>
            through text</h2>
            <br></br>
    
            <p>Dear {name1}, Welcome to out Blog-website.<br></br> A place to read ,write and access information about the growing World</p>
            <br></br>
            <button onClick = {handleClick }>Start your Journey</button>
            {blogs.map((blogs)=> (
                <div className="blog-preview" key ={blogs.id}>
                <h2>{blogs.title}</h2>
                <p>Written by{blogs.author}</p>
                </div>

            ))}
            
            

        </div>
      );
}
 
export default Home;