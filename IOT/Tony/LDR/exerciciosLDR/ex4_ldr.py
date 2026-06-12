from machine import Pin, ADC,PWM
from utime import sleep

ldr = ADC(26)
led = PWM(Pin(16))

led.duty_u16(0)
led.freq(1000)

while True:
    leitura_luz =  ldr.read_u16()
    valor_luz = ldr.read_u16()
    brilho = 65535 - valor_luz
    
    
    led.duty_u16(brilho)
    print("Led ascende em: ", brilho)
        
    sleep(0.5)
