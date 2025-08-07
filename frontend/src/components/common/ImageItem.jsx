function ImageItem({data, remark}){
    return(
        <div className="ImageItem">
            <img src={data} alt={remark} />
        </div>
    )
}

export default ImageItem