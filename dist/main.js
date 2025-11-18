var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

const TYPING_SPEED = 40;
const HEART_FALL_COUNT = 100;

window.addEventListener("DOMContentLoaded", e => {
    main();
});

let data;
let greetingEl;
let openGalleryBtn;
let welcomeScreen;
let galleryScreen;
let galleryIndex = 0;
let imageWrapper;
let captionEl;
let prevBtn;
let nextBtn;
let heartsLayer;

let indicatorsContainer; // ⬅️ NUOVO

function main() {
    return __awaiter(this, void 0, void 0, function* () {
        data = yield getData();

        greetingEl = document.getElementById('greeting');
        openGalleryBtn = document.getElementById('openGalleryBtn');
        openGalleryBtn.addEventListener('click', () => showGallery());

        welcomeScreen = document.getElementById('welcomeScreen');
        galleryScreen = document.getElementById('galleryScreen');

        imageWrapper = document.getElementById('imageWrapper');
        imageWrapper.addEventListener("dblclick", e => launchHearts(HEART_FALL_COUNT));

        captionEl = document.getElementById('caption');
        prevBtn = document.getElementById('prevBtn');
        prevBtn.addEventListener('click', () => showImage(galleryIndex - 1));
        nextBtn = document.getElementById('nextBtn');
        nextBtn.addEventListener('click', () => showImage(galleryIndex + 1));

        heartsLayer = document.getElementById('heartsLayer');

        addSwipeSupport();

        createIndicators(); // ⬅️ NUOVO

        typeText(data.text, onTypingComplete);
    });
}

function getData() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch("data.json");
        if (!response.ok) {
            console.error(response.statusText);
            return;
        }
