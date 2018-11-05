import React from 'react'
const fs = window.require('fs')

class Gallery extends React.Component {
	state = {
		imgs: [],
	}

	componentDidMount = () => {
		fs.readdir('./src/screenshots', null, (err, imgs) => {
			if(!imgs) {
				return
			}

			imgs.forEach( img => {
				const file = fs.readFile(`./src/screenshots/${img}`, 'base64', (error, file) => {
					// convert img to valid base64 code
					const base64 = `data:image/png;base64,${file}`;
					this.setState(state => {
						const newImgArr = state.imgs.concat();
						newImgArr.push({
							src: base64,
							// with path for possibility deleting img in future
							path: img,
						})

						return { imgs: newImgArr};
					})
				})
			})
		})
	}

	render() {
		const { imgs } = this.state;

		const galleryContainerStyles = {
			display: 'flex',
			flexWrap: 'wrap'
		}

		const galleryItemWrapStyles = {
			width: 200,
			height: 300,
		}

		const imgStyles = {
			maxWidth: '100%',
			maxHeight: '100%',
		}

		return (
			<div style={galleryContainerStyles}>
				{
					imgs.length === 0
						? <p>На данный момент фотографий нет</p>
						:
							imgs.map( img => {
								return (
									<div style={galleryItemWrapStyles}>
									<img src={img.src} alt="gallerry-picture" style={imgStyles} />
									</div>
								)

				})}
			</div>
		)
	}
}

export default Gallery
