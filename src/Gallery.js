import React from 'react'
import config from './utils/config'
const fs = window.require('fs')

class Gallery extends React.Component {
	state = {
		imgs: [],
	}

	componentDidMount = () => {
		const imgsToState = [];
		readScreenshots();
		readWebshots();

		// sort by creating time; from newest to oldest
		imgsToState.sort( (a, b) => {
			return b.path.split('.')[0] - a.path.split('.')[0];
		})

		this.setState({
			imgs: imgsToState,
		})

		function readScreenshots() {
			readPictures({ folderPath: `./src/${config.screenshotsFolderName}`, imgExt: 'png' })
		}

		function readWebshots() {
			readPictures({ folderPath: `./src/${config.webshotsFolderName}`, imgExt: 'png' })
		}

		function readPictures({ folderPath, imgExt }) {
			// such a perverted way to check is directory exist
			try {
				fs.statSync(folderPath)
			} catch(e) {
				return;
			}
			
			const imgs = fs.readdirSync(folderPath, null)

			if(!imgs) {
				return;
			}

			imgs.forEach( img => {
				const file = fs.readFileSync(`${folderPath}/${img}`, 'base64')
					// convert img to valid base64 code
				const base64 = `data:image/${imgExt};base64,${file}`;
				imgsToState.push({
					src: base64,
					// with path for possibility deleting img in future
					path: img,
				})
			})
		}
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
			padding: 20,
		}

		const imgStyles = {
			maxWidth: '100%',
			maxHeight: '100%',
		}

		return (
			<div style={galleryContainerStyles}>
				{
					imgs.length === 0
						?
							<p>На данный момент фотографий нет</p>
						:
							imgs.map( img => {
								return (
									<div style={galleryItemWrapStyles} key={img.path}>
										<img src={img.src} alt="gallery-item" style={imgStyles} />
									</div>
								)

				})}
			</div>
		)
	}
}

export default Gallery
