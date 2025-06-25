// Blog rendering component
export const RenderBlogContent = (blog) => {
    return (
        <div className="blog-content text-black">
            {/* Render the blog HTML directly */}
            <div dangerouslySetInnerHTML={{ __html: blog }} />
        </div>
    );
};



// Function to extract paragraph tags only
export const ExtractParagraphs = (htmlString) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, 'text/html');
    const paragraphs = Array.from(doc.querySelectorAll('p')); // Get all <p> tags
    return paragraphs.map((p) => p.textContent).join(' '); // Join all <p> contents
};


// Utility to extract the first image URL from blog content
export const ExtractFirstImageUrl = (blogContent) => {
    const imgRegex = /<img.*?src="(.*?)"/;
    const match = blogContent.match(imgRegex);
    return match ? match[1] : null;
};

// Utility to extract the first video URL from blog content
export const ExtractFirstVideoUrl = (blogContent) => {
    const videoRegex = /<video.*?src="(.*?)"/;
    const iframeRegex = /<iframe.*?src="(.*?)"/;
    const matchVideo = blogContent.match(videoRegex);
    const matchIframe = blogContent.match(iframeRegex);
    return matchVideo ? matchVideo[1] : matchIframe ? matchIframe[1] : null;
};