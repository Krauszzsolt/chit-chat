export function openSnackBar(message: string, snackBar: any) {
  snackBar.open(message, 'OK', {
    duration: 5000,
    horizontalPosition: 'center',
  });
}
