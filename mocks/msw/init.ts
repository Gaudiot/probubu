export async function initMocks() {
    const { worker } = await import("./worker");
    await worker.start({
        onUnhandledRequest: "warn",
    });
    console.log("🚀 MSW ativado e pronto para interceptar requisições!");
}
