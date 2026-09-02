<section id="self" class="relative w-full">
	<div aria-hidden="true" class="dot-grid pointer-events-none absolute inset-0"></div>

	<div
		class="relative mx-auto flex min-h-dvh max-w-5xl flex-col items-center justify-center gap-10 px-6 py-24 md:flex-row md:justify-between"
	>
		<img
			class="order-first h-40 w-40 rounded-full border-2 border-border transition-colors duration-300 hover:border-accent sm:h-48 sm:w-48 md:order-0 md:h-52 md:w-52 lg:h-56 lg:w-56"
			alt="Hazuki Keatsu"
			src="/profile-pic.png"
		/>

		<div class="w-full max-w-2xl">
			<h2 class="text-center text-3xl font-black tracking-tight sm:text-4xl md:text-left">About</h2>

			<div class="mt-8 space-y-6 text-base leading-relaxed sm:text-lg">
				<p>
					An undergraduate student from China majoring in Software Engineering — a XDUer. I'm not a
					theorist but a hands-on person, and I actively contribute to various open-source projects.
				</p>
				<p>
					Right now I'm focusing on Compiler and Operating System. If you are interested in me, feel
					free to reach out.
				</p>
			</div>
		</div>
	</div>
</section>

<style>
	.dot-grid {
		background-image: radial-gradient(circle, var(--color-muted) 2px, transparent 1.5px);
		background-size: 48px 48px;
		-webkit-mask-image: radial-gradient(ellipse 70% 60% at 50% 50%, #000 45%, transparent 80%);
		mask-image: radial-gradient(ellipse 70% 60% at 50% 50%, #000 45%, transparent 80%);
	}
</style>
