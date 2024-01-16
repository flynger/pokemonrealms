export default function Navbar() {
    return (
        <header ondragstart="return false;" ondrop="return false;">
            <nav class="navbar navbar-expand-md bg-dark-subtle sticky-top" data-bs-theme="dark">
                <div class="container-fluid justify-content-center">
                    <div class="navbar-collapse collapse w-100 order-1 order-md-0 multi-collapse" id="navbarNav">
                        <ul class="navbar-nav ms-auto">
                            <li class="nav-item">
                                <a id="home" class="nav-link" href="/home">Home</a>
                            </li>
                            <li class="nav-item">
                                <a id="play" class="nav-link" href="/play">Play</a>
                            </li>
                            <li class="nav-item">
                                <a id="settings" class="nav-link" href="#">Settings</a>
                            </li>
                        </ul>
                    </div>
                    <div class="order-0 d-flex" style="margin-right: 30px; margin-left: 30px;">
                        <a class="navbar-brand mx-0 mb-0 d-flex align-items-center" style="color: var(--bs-navbar-color);" href="/play">
                            <img class="d-inline-block align-middle mx-auto" width="21.333px" height="32px" src="res/characters/green.gif"
                                alt="randomCharacter" />
                            <span style="margin-left: 5px;">Pokémon Realms</span>
                        </a>
                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target=".multi-collapse"
                            aria-controls="navbarNav navbarNav2" aria-expanded="false" aria-label="Toggle navigation"
                            style="margin-left: 10px;">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                    </div>
                    <div class="navbar-collapse collapse w-100 order-3 multi-collapse" id="navbarNav2">
                        <ul class="navbar-nav me-auto">
                            <li class="nav-item">
                                <a id="login" class="nav-link" href="/login">Login</a>
                            </li>
                            <li class="nav-item">
                                <a id="register" class="nav-link" href="/register">Register</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
}