export function formatDate(dateParam: string): string {
    const actualDate = new Date().toISOString();
    const actualDateValidation = actualDate.match(/\d+/g)?.splice(0, 6);
    const validationDate = dateParam.match(/\d+/g)?.splice(0, 6);
    const timeSlugArray = ['Año(s)','Mes(es)','Día(s)','Hora(s)','Minuto(s)','Segundo(s)']

    if (validationDate && actualDateValidation) {
        for (let i = 0; i < 6; i++) {
            if(validationDate[i] != actualDateValidation[i]){
                const validationNumber = parseInt(validationDate[i])
                const actualValidationNumber = parseInt(actualDateValidation[i])
                return `Hace ${actualValidationNumber - validationNumber} ${timeSlugArray[i]} `
            }

        }
    }

    return 'Hace 0 segundos';
}



