import React, { Component } from "react";
import axios from "axios";
import RichTextEditor from "../forms/rich-text-editor";
import DropzoneComponent from "react-dropzone-component"; 

export default class BlogForm extends Component {
    constructor(props){
        super(props);

        this.state = {
            title: "",
            blog_status: "",
            content: "",
            featured_image: ""
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleRichTextEditorChange = this.handleRichTextEditorChange.bind(this);

        this.componentConfig = this.componentConfig.bind(this);
        this.djsConfig = this.djsConfig.bind(this);
        this.handleFeaturedImageDrop = this.handleFeaturedImageDrop.bind(this);

        this.featuredImageRef = React.createRef();
    }

    componentWillMount() {
        if(this.props.editMode) {
            this.setState({
                id: this.props.blog.id,
                title: this.props.blog.title,
                status: this.props.blog.status,
                blog_status: this.props.blog.blog_status
            })
        }
    }

    handleFeaturedImageDrop() {
        return {
            addedfile: file => this.setState({ featured_image: file })
        };
    }

    djsConfig() {
        return {
            addRemoveLinks: true,
            maxFiles: 1
        }
    }

    componentConfig() {
        return {
            iconFiletypes: [".jpg", ".png"],
            showFiletypeIcon: true,
            postUrl: "https://httpbin.org/post"
        }
    }

    handleRichTextEditorChange(content) { 
        this.setState({ content });
     }

    buildForm() {
        let formData = new FormData();

        formData.append("portfolio_blog[title]", this.state.title);
        formData.append("portfolio_blog[blog_status]", this.state.blog_status);
        formData.append("portfolio_blog[content]", this.state.content);

        if (this.state.featured_image) {
            formData.append("portfolio_blog[featured_image]", this.state.featured_image);
        }

        return formData;
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit(event) {
        axios.post("https://davidmartinez.devcamp.space/portfolio/portfolio_blogs", 
        this.buildForm(), 
        {withCredentials: true}
        ).then(response => {
            if(this.state.featured_image) {
                this.featuredImageRef.current.dropzone.removeAllFiles();
            }
            this.state = ({
                title: "",
                blog_status: "",
                content: "",
                featured_image: ""
            });

            this.props.handleSuccessfullFormSubmission(response.data.portfolio_blog);                    
        }).catch(error => {
            console.log("handleSubmit error", error);
        })
        event.preventDefault();
    }

    render() {
        return(
            <form onSubmit={this.handleSubmit} className="blog-form-wrapper">
                <div className="two-colum">
                    <input 
                    onChange={this.handleChange} 
                    type="text" 
                    name="title"
                    placeholder="Blog Title"
                    value={this.state.title}
                    />
                    
                    <input 
                    onChange={this.handleChange} 
                    type="text" 
                    name="blog_status"
                    placeholder="Blog Status"
                    value={this.state.blog_status}
                    />
                </div>

                <div className="one-colum">
                    <RichTextEditor 
                    handleRichTextEditorChange={this.handleRichTextEditorChange}
                    editMode={this.props.editMode}
                    contentToEdit={this.props.editMode && this.props.blog.content ? this.props.blog.content : null}
                    />
                </div>
                
                <div className="image-uploadres">
                    <DropzoneComponent 
                        ref={this.featuredImageRef}
                        config={this.componentConfig()}
                        djsConfig={this.djsConfig()}
                        eventHandlers={this.handleFeaturedImageDrop()}
                    >
                        <div className="dz-message">Featured image</div>
                    </DropzoneComponent>
                </div>

                <button type="submit" className="btn">Save</button>
            </form>
        )
    };
}