<template>
    <div>
        <h1>Drone Simulation Results</h1>
        <div v-for="drone in drones" :key="drone.droneId">
            Drone {{ drone.droneId }} completed tasks: {{ drone.completedTasks }}. Total energy consumption: {{
                drone.totalEnergyConsumption }}
        </div>
        <img :src="plotImg" alt="Drone Simulation Plot">
    </div>
</template>

<script>
import droneSimulate from "@/api/drone_system/droneSimulate";
export default {
    data() {
        return {
            drones: [],
            plotImg: "",
        };
    },
    async mounted() {
        await this.callDroneSimulationApi();
    },
    methods: {
        async callDroneSimulationApi() {
            const droneSimulationRequest = {
                drones: [
                    { x: 5000, y: 5000, battery: 100 },
                    { x: 4000, y: 4000, battery: 100 },
                ],
                taskList: [
                    { x: 1000, y: 1000, priority: 1, energy_requirement: 5 },
                    { x: 2000, y: 2000, priority: 2, energy_requirement: 7 },
                    { x: 3000, y: 3000, priority: 3, energy_requirement: 9 },
                ],
            };

            const response = await fetch("http://localhost:8080/api/drone_simulation", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(droneSimulationRequest),
            });

            if (response.ok) {
                const apiResult = await response.json();
                this.drones = apiResult.data.drones;
                this.plotImg = "data:image/png;base64," + apiResult.data.image;
            } else {
                console.error("Error calling drone_simulation API: ", response.status, response.statusText);
            }
        },
    },
};
</script>
