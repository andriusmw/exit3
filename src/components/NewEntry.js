import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { sendEntryService } from "../services";

export const NewEntry = () => {
    const [error, setError] = useState("");
    const [sending, setSending] = useState(false);
    const {token} = useContext(AuthContext)
    //estados para control de los inputs
    const [title, setTitle] = useState("");
    const [descr, setDescr] = useState("");
    const [city, setCity] = useState("");
    const [neigh, setNeigh] = useState("");
    const [status, setStatus] = useState("");
    const [userId, setUserId] = useState("");


    
    const handleForm = async (e) => {
        e.preventDefault();
    /* -----PARA CONTROLAR LOS CAMPOS Y VER LO QUE SE PASA A FORMDATA
        console.log("title: "+ title);
        console.log("descr: " + descr);
        console.log("city: " + city);
        console.log("neigh:" + neigh);
        console.log("status: " + status);
        console.log("userId: " + userId);  */

        try{
            setSending(true);

           
            const data = new FormData(e.target);
            const entry = await sendEntryService({data,token});
            
            console.log(entry);
        } catch (error) {
            console.log(error)
            console.log(error.message)
            setError(error.message);
        } finally {
            setSending(false);
        }
    }
 

   return (
    
    <form onSubmit={handleForm} >
        <h1>Add new Entry</h1>

        <fieldset>
            <label htmlFor="title">Title: </label>
            <input type="text" id="title" name="title" required onChange={(e) => setTitle(e.target.value)} />
        </fieldset>
        <fieldset>
            <label htmlFor="description">Description: </label>
            <input type="text" id="description" name="description" required  onChange={(e) => setDescr(e.target.value)}/>
        </fieldset>    
        <fieldset>
            <label htmlFor="image">Image (optional): </label>
            <input type="file" id="image" name="image" defaultValue={null} />
        </fieldset>
        <fieldset> 
            <label htmlFor="city">City: </label>
            <input type="text" id="city" name="city" required onChange={(e) => setCity(e.target.value)}/>
       </fieldset>
       <fieldset>
            <label htmlFor="neighborhood">Neighbourhood: </label>
            <input type="text" id="neighborhood" name="neighborhood" required onChange={(e) => setNeigh(e.target.value)} />
        </fieldset>    
        <fieldset>
            <label htmlFor="status">Status: </label>
            <input type="text" id="status" name="status" required onChange={(e) => setStatus(e.target.value)} />
        </fieldset>
         <fieldset>
            <label htmlFor="user_id">user_id: </label>
            <input type="text" id="user_id" name="user_id" required onChange={(e) => setUserId(e.target.value)} />
         </fieldset>
            <button>Send Entry</button>
            {sending ? <p>Sending Entry</p> : null}
            {error ? <p>{error} </p> : null}

       

    </form>
   ) 
}