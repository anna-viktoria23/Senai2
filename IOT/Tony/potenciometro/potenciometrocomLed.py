from machine import Pin, ADC, PWM #usar na porta 26, 27 e 28 #PWM para a frequencia
from utime import sleep

#declarar o potenciometro
pot = ADC(28)
led = PWM(Pin(17))
led.freq(1000)

led.duty_u16(0)

while True:
    #variavel valor guardando od dados do potenciometro
    valor = pot.read_u16() #quando utiliza a porta ADC é para fazer a leitura
    print(valor) #mostra o valor
    led.duty_u16(valor)
    sleep(0.8)
    
    
    