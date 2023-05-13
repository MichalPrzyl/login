const DisplayData = (props: any) => {
    const { data } = props;
    return <>
        {data?.map((el: any) => (
            <Record
                element={el}
                key={el.id}
            />
        ))}
    </>
}
export default DisplayData;


const Record = (props: any) => {
    const { element } = props;

    return <>
        <div key={element.id}>
            <div>ID: {element.id}</div>
            <div>NAME: {element.name}</div>
        </div>
        <div className="rmv-btn btn">Usuń</div>
    </>
}