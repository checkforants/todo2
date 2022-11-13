import * as React from "react"
import cl from './Edit.module.scss'
	//

const Edit = ({handleEdit, color}) => (
	<button className={cl.edit} onClick={handleEdit}>
		<svg xmlns="http://www.w3.org/2000/svg" width={18} height={18}>
			<path
			style={{
				stroke: "none",
				fillRule: "nonzero",
				fill: color,
				fillOpacity: 0.78039,
			}}
			d="M12.031 2.023c-.496 0-.965.247-1.355.633l-8.114 8.07-1.355 4.06 4.059-1.352.086-.082 8.035-7.985c.386-.39.629-.86.629-1.355 0-.496-.243-.965-.63-1.356-.39-.386-.859-.633-1.355-.633Zm-2.004 2.688 1.293 1.297-6.593 6.554-1.938.645.648-1.941Zm0 0"
			/>
		</svg>
	</button>
)

export default Edit