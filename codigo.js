const { createApp } = Vue;
createApp({
    data() {
        return {
            personas: JSON.parse(localStorage.getItem('personas')) || [],
            persona: { nombre: '', apellido: '', edad: 0 },
            edicion: false,
            indexEdicion: null,
            ordenAsc: true,
        };
    },
    computed: {
        camposValidos() {
            return this.persona.nombre && this.persona.apellido && this.persona.edad >= 0;
        }
    },
    methods: {
        guardar() {
            this.personas.push({ ...this.persona });
            this.guardarLocal();
            this.limpiar();
        },
        limpiar() {
            this.persona = { nombre: '', apellido: '', edad: 0 };
            this.edicion = false;
            this.indexEdicion = null;
        },
        borrar(index) {
            this.personas.splice(index, 1);
            this.guardarLocal();
        },
        cargarDatos(index) {
            this.persona = { ...this.personas[index] };
            this.indexEdicion = index;
            this.edicion = true;
        },
        actualizar() {
            this.personas[this.indexEdicion] = { ...this.persona };
            this.guardarLocal();
            this.limpiar();
        },
        limpiarLista() {
            this.personas = [];
            localStorage.removeItem('personas');
        },
        ordenar(campo) {
            this.personas.sort((a, b) => {
                if (a[campo] < b[campo]) return this.ordenAsc ? -1 : 1;
                if (a[campo] > b[campo]) return this.ordenAsc ? 1 : -1;
                return 0;
            });
            this.ordenAsc = !this.ordenAsc;
        }
    }
}).mount('#app');
