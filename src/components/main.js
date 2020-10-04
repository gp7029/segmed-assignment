import React from 'react';
import {GET, POST, isValidResponse} from '../utilities';

class ImageViewerPort extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active_tab: 'All Images',
            loading: true,
            image_data: [], 
            selected_image: {}
        }
        this.fetchImageData = this.fetchImageData.bind(this);
        this.handleImageSelect = this.handleImageSelect.bind(this);
        this.handleFlagAction = this.handleFlagAction.bind(this);
        this.setActiveTab = this.setActiveTab.bind(this);
    }

    componentDidMount(){
        this.fetchImageData();
    }

    /**
     * This async function fetches all the images from the backend.
     * This only called once during initial render
     */
    async fetchImageData(){
        const response = await GET('v1/images', {});
        if (isValidResponse(response)){
            const image_data = response.data.payload || [];
            const selected_image = image_data[0] || {};
            this.setState({image_data, selected_image});
        }
        this.setState({loading: false});
    }

    /**
     * The function handles the click event when an image is clicked from gallery.
     * Sets the selected image as current image being viewed 
     * @param {Object} image_object - represents image metadata in json
     */
    handleImageSelect(image_object){
        console.log(image_object)
        this.setState({selected_image: image_object});
    }

    /**
     * Makes REST POST call to flag/unflag an image
     * @param {Object} selected_image - represents the image metadata on which to perform flag/unflag operation
     */
    async handleFlagAction(selected_image){
        if (!selected_image.id){
            return;
        }

        // Using explicit if else for readability.
        // ternary operator could be used here as well. e.g. const new_flag_value = !!selected_image.flagged ? 0 : 1;
        let new_flag_value = 1;
        if (!!selected_image.flagged){
            new_flag_value = 0;
        }
        const response = await POST(`v1/images/${selected_image.id}`, {flagged: new_flag_value});
        if (isValidResponse(response)){

            // Setting image_data state by recreating the state with new flag value
            this.setState((state)=>{
                const image_data_new = (state.image_data || []).map(image_object=>{
                    if ( image_object.id === selected_image.id ){
                        image_object.flagged = new_flag_value
                    }
                    return image_object
                })
                return {
                    image_data: image_data_new
                }
            });
        }
    }

    /**
     * Action Handler to set active tab
     * @param {String} tab_name - Name of Gallery type. All images or Flagged Images
     */
    setActiveTab(tab_name){
        this.setState({active_tab: tab_name})
    }

    render(){
        let image_data = this.state.image_data;
        if (this.state.active_tab === 'Flagged Images'){
            image_data = image_data.filter(image_object => !!image_object.flagged)
        }
        const selected_image = this.state.selected_image;
        return (
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-md-3'>
                        <GalleryType {...this.props} active_tab={this.state.active_tab} setActiveTab={this.setActiveTab} />
                        <Gallery {...this.props} image_data={image_data} selected_image={selected_image} handleImageSelect={this.handleImageSelect} />
                    </div>
                    <div className='col-md-9 image-container-background'>
                        <div className='image-container'>
                            <img src={ selected_image.url || '' } width="100%" height="100%" />
                        </div>
                        <div className='flag-button-container'>
                            <button className='flag-button' onClick={()=>this.handleFlagAction(selected_image)}>{ selected_image.flagged ? "Unflag" : "Flag" }</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

/**
 * A functional component representing Image gallery tabs
 * @param {Object} props - react props from parent component
 */
const GalleryType = (props) => {
    return (
        <div className="gallery-tabs-container">
            <ul className="gallery-tabs-ul">
                <li className={`gallery-tabs ${props.active_tab==="All Images" ? "gallery-tabs-active" : ""}`} onClick={()=>props.setActiveTab('All Images')}>
                    All Images
                </li>
                <li className={`gallery-tabs ${props.active_tab==="Flagged Images" ? "gallery-tabs-active" : ""}`} onClick={()=>props.setActiveTab('Flagged Images')}>
                    Flagged Images
                </li>
            </ul>
        </div>
    )
}

/**
 * A functional component representing Image gallery
 * @param {Object} props - react props from parent component
 */
const Gallery = (props) => {
    let image_data = props.image_data;
    return(
        <ul>
            {
                image_data.map(image_object=>{
                    return(
                        <li className={`gallery-list ${props.selected_image.id===image_object.id ? "gallery-list-active" : ""}`} onClick={()=>props.handleImageSelect(image_object)}>
                            {image_object.title}
                        </li>
                    )
                })
            }
        </ul>
    )
}

export default ImageViewerPort