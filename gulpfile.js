import path from 'path';
import fs from 'fs';
import { glob } from 'glob';
import { src, dest, watch, series } from 'gulp';
import * as dartSass from 'sass';
import gulpSass from 'gulp-sass';
import concat from 'gulp-concat';
import terser from 'gulp-terser';
import sharp from 'sharp';
import rename from 'gulp-rename';
import plumber from 'gulp-plumber';

const sass = gulpSass(dartSass);

const paths = {
    scss: 'src/scss/**/*.scss',
    js: 'src/js/**/*.js'
};

export function css(done) {
    src(paths.scss, { sourcemaps: true })
        .pipe(plumber({ // Agrega plumber aquí
            errorHandler: function(err) {
                console.error('Error in Sass compilation', err.message);
                this.emit('end');
            }
        }))
        .pipe(sass({
            outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(dest('./build/css', { sourcemaps: '.' }));
    done();
}

export function js(done) {
    src(paths.js)
        .pipe(concat('bundle.js')) // final output file name
        .pipe(terser())
        .pipe(rename({ suffix: '.min' }))
        .pipe(dest('./build/js'));
    done();
}

export async function imagenes(done) {
    const srcDir = './src/img';
    const buildDir = './build/img';
    const images = await glob('./src/img/**/*');

    await Promise.all(images.map(async file => {
        const relativePath = path.relative(srcDir, path.dirname(file));
        const outputSubDir = path.join(buildDir, relativePath);
        await procesarImagenes(file, outputSubDir);
    }));
    done();
}

async function procesarImagenes(file, outputSubDir) {
    if (!fs.existsSync(outputSubDir)) {
        fs.mkdirSync(outputSubDir, { recursive: true });
    }
    const baseName = path.basename(file, path.extname(file));
    const extName = path.extname(file);

    if (extName.toLowerCase() === '.svg') {
        // If it's an SVG file, move it to the output directory
        const outputFile = path.join(outputSubDir, `${baseName}${extName}`);
        fs.copyFileSync(file, outputFile);
    } else {
        // For other image formats, process them with sharp
        const outputFile = path.join(outputSubDir, `${baseName}${extName}`);
        const outputFileWebp = path.join(outputSubDir, `${baseName}.webp`);
        const outputFileAvif = path.join(outputSubDir, `${baseName}.avif`);
        const options = { quality: 80 };

        try {
            await sharp(file).jpeg(options).toFile(outputFile);
            await sharp(file).webp(options).toFile(outputFileWebp);
            await sharp(file).avif().toFile(outputFileAvif);
        } catch (error) {
            console.error(`Error processing file ${file}: ${error.message}`);
        }
    }
}

export function dev() {
    watch(paths.scss, css);
    watch(paths.js, js);
    watch('src/img/**/*.{png,jpg}', imagenes);
}

export default series(js, css, imagenes, dev);
