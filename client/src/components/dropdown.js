import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { MyContext } from './myProvider'

const Dropdown = (props) => {
    const value = useContext(MyContext)
    const handleClick = (params) => {
        console.log(params.target)
        params.target.parentNode.parentNode.children[1].classList.toggle("show")
    }


    window.onclick = function (e) {
        var elem = e.target.parentNode
        if (!elem.matches('.dropbtn')) {
            var dropdowns = document.querySelectorAll(".dropdown")
            dropdowns.forEach(dropdown => {
                if (dropdown.children[1].classList.contains("show")) {
                    dropdown.children[1].classList.remove("show")
                }
            }
            )
        }
    }

    return (
        <div className="dropdown" >
            <button className="dropbtn" onClick={handleClick}>
                {props.dropdown}
            </button>
            <div className="dropdown-content">
                {props.contents.map(content =>
                    content
                )}
            </div>
        </div>
    )
}
export default Dropdown