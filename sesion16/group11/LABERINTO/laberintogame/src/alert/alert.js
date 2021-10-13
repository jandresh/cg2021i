function win(){
     
    Swal.fire({
        icon: 'success',
        title: 'Your win!',
        text: '¡Congratulations!',
        confirmButtonText: 'Try again',
        width: 600,
        padding: '3em',
        backdrop: `
          rgba(0,0,123,0.4)
          url("../../assets/images/win.gif")
          left top
          no-repeat
        `,
        footer: 'GAME'
      })
      
}

function lose(){
     
    Swal.fire({
        icon: 'error',
        title: 'Oops...GameOver!',
        text: '¡Que pena!',
        confirmButtonText: 'Try Again',
        width: 600,
        padding: '3em',
        backdrop: `
          rgba(0,0,123,0.4)
          url("../../assets/images/lose.gif")
          left top
          no-repeat
        `,
        footer: 'GAME'
      })
      
}
