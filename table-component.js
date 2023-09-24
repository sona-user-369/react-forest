// Made by Sona

const headers = ['Book', 'Author', 'Language', 'Published', 'Sales'];
const data = [
    [
        'A Tale of Two Cities', 'Charles Dickens',
        'English', '1859', '200 million',
    ],
    [
        'Le Petit Prince (The Little Prince)', 'Antoine de Saint-Exupéry',
        'French', '1943', '150 million',
    ],
    [
        "Harry Potter and the Philosopher's Stone", 'J. K. Rowling',
        'English', '1997', '120 million',
    ],
    [
        'And Then There Were None', 'Agatha Christie',
        'English', '1939', '100 million',
    ],
    [
        'Dream of the Red Chamber', 'Cao Xueqin',
        'Chinese', '1791', '100 million',
    ],
    [
        'The Hobbit', 'J. R. R. Tolkien',
        'English', '1937', '100 million',
    ],
];


class TableComponent extends React.Component{

    constructor(props) {
        super();
        this.state = {
            data: props.initialData,
            sortCol: null,
            descending: false,
            edit: null,
            valueChange: null
        };
        this.onColumnClick = this.onColumnClick.bind(this);
        this.showEditor = this.showEditor.bind(this);
        this.save = this.save.bind(this);
    }

    onColumnClick(e){
        const data = JSON.parse(JSON.stringify(this.state.data)) ;
        const column = e.target.cellIndex ;
        const descending = this.state.sortCol === column && !this.state.descending ;
        data.sort((a,b) => {
            if(a[column] === b[column]) {
                return 0;
            }
            return descending ?
                 -1:
                !descending ?
                    -1:
                a[column] > b[column] ?
                    1:
                    -1

        })

        this.setState({
            data,
            sortCol: column,
            descending,
        });
    }

    showEditor(e){
        this.setState({
            edit: {
                row: parseInt(e.target.parentNode.dataset.row, 10),
                column: e.target.cellIndex,
            },
            // valueChange: e.target.innerHTML
        })
    }

    save(e){
        this.setState({
            valueChange: e.target.value ,
            edit : null,
        })
    }

    render(){

        return (<table>
            <thead onClick={this.onColumnClick} >
            <tr>
                {this.props.headers.map(
                    (title,idx) => (<th  key={idx}>
                        {this.state.sortCol === idx ? this.state.descending ? title + ' \u2191': title + ' \u2193' : title}
                    </th>)
                )
                }
            </tr>
            </thead>
            <tbody onDoubleClick={this.showEditor}>
            {this.state.data.map(
                (row,idx) => (
                    <tr key={idx}>
                        {
                            row.map((cell, idy) => {
                                const edit = this.state.edit;
                                if(edit){
                                    if( this.state.edit.row === idx &&  this.state.edit.column===idy){
                                       return  (<form onSubmit={this.save}>
                                           <input type='text' defaultValue={cell}/>
                                       </form>) ;
                                    }
                                }else{
                                    return (<td key={idy}>{ this.state.valueChange ? this.state.valueChange: cell}</td>) ;
                                }
                        })
                        }
                    </tr>
                )
            )}
            </tbody>
        </table>);
    }
}


// TableComponent.propTypes = {
//     headers: PropTypes.array(PropTypes.string),
//     initialData: PropTypes.array(PropTypes.array(PropTypes.string))
// }
//
// PropTypes.checkPropTypes(TableComponent.propTypes, TableComponent.)