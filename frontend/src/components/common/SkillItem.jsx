function SkillItem({item,active}){
    return(
        <div className={`SkillItem ${active ? 'active' : ''}`}>
            {item}
        </div> 
    )
}

export default SkillItem