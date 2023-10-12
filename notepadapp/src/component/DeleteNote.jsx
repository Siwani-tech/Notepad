


// eslint-disable-next-line react/prop-types
export default function DeleteNote({onDelete}){


    return(

        <>
        <button className="deleteNote" onClick={onDelete}>❌</button>
        
        </>
    )
}