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
            valueChange: null,
            index: null,
            search:false,
        };
        this.onColumnClick = this.onColumnClick.bind(this);
        this.showEditor = this.showEditor.bind(this);
        this.save = this.save.bind(this);
        this.changeSearchState = this.changeSearchState.bind(this);
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


    changeSearchState(e){
        e.preventDefault();
        const search = !this.state.search ;
        this.setState({
            search,
        })
    }

    onChangeSearch(e){

    }

    save(e){
        e.preventDefault();
        const input = e.target.firstChild
        const old = JSON.parse(JSON.stringify(this.state.edit)) ;
        const data = JSON.parse(JSON.stringify(this.state.data));
        data[old.row][old.column] = input.value
        this.setState({
            valueChange: input.value ,
            edit : null,
            data,
            index: {
                row: old.row,
                column: old.column
            }
        })
    }



    render(){
        const search = this.state.search ;
        return (<div>
            <button onClick={this.changeSearchState}>{search ? 'Hide Search' : 'Show Search'}</button>
            <table>
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
                {search ? <tr>
                    {
                        this.props.headers.map(
                            (_, idx) => (
                                <td key={idx}>

                                        <input type='text' defaultValue=''/>

                                </td>
                            )
                        )
                    }
                </tr> : <tr></tr>}
                {this.state.data.map(
                    (row,idx) => (
                        <tr key={idx} data-row={idx}>
                            {
                                row.map((cell, idy) => {
                                    const edit = this.state.edit;
                                    const valueChange = this.state.valueChange;
                                    const index = this.state.index ;
                                    if(edit != null){
                                        if( edit.row === idx && edit.column===idy){
                                            return  (<td key={idy}><form onSubmit={this.save}>
                                                <input type='text' defaultValue={cell}/>
                                            </form></td>);
                                        }
                                    }
                                    return (<td key={idy}>{cell}</td>) ;

                                })
                            }
                        </tr>
                    )
                )}
                </tbody>
            </table>
        </div>);
    }
}


// TableComponent.propTypes = {
//     headers: PropTypes.array(PropTypes.string),
//     initialData: PropTypes.array(PropTypes.array(PropTypes.string))
// }
//
// PropTypes.checkPropTypes(TableComponent.propTypes, TableComponent.)